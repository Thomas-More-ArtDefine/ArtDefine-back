import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm/repository/Repository';
import { visibility } from 'src/app.controller';
import { FoldersService } from 'src/folders/folders.service';
import { Folder } from 'src/folders/entities/folder.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly foldersService: FoldersService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    createPostDto = await this.checkPostVisibilityUpload(createPostDto);
    
    return await this.postsRepository.save(createPostDto);
  }

  async checkPostVisibilityUpload(post: CreatePostDto):Promise<CreatePostDto>{
    var check:Promise<CreatePostDto> = new Promise((resolve, reject) => {
        let index = 1;
      post.folders.forEach(async (folderId) => {
        let folder: Folder = await this.foldersService.findOneFolder(folderId.id);
        // TODO: account for other visibility types
        if (folder.folder_visibility === visibility.PUBLIC && post.post_visibility != visibility.PUBLIC) {
          post.post_visibility = visibility.PUBLIC;
          resolve(post);
        }else if(post.folders.length <= index){
          post.post_visibility = visibility.PRIVATE;
          resolve(post);
        }else{
          index++;
        }}
      )
  });
  return check;
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findRandomPosts(numberPosts: number, exclude?:string): Promise<Post[]> {
    const totalNumberPosts: number = await this.postsRepository.count();
    
    let feedArray: Post[] = [];
    let usedIds: string[] = [];
    if (exclude != undefined) {
      usedIds = exclude.split(',');
      
    }

    // return empty array when no posts are found
    if (totalNumberPosts === 0) {
      return [];
    }

    let index = 0
    for (let timeout = 0; index < numberPosts; timeout++) {
      let id: string = (Math.floor(Math.random() * totalNumberPosts)+1).toString();
      
      if (!usedIds.includes(id)) {
        usedIds.push(id);
      
        let post:Post = await this.postsRepository.findOne({
          where: {
            id: id,
        },
        relations: {
          user: true
        }
        });

        if (post === null) {
          break;
        }

        post.user = getBasicUserInfo(post.user);

        if (post.post_visibility === visibility.PUBLIC) {
          feedArray.push(post);
          index++
        }
        if (timeout > 50) {
          break;
        }
      }
    }
    return feedArray;
  }

  findAllByUserId(userid: string): Promise<Post[]> {
    return this.postsRepository.find(
      {
        where: {
          user_id: userid,
      },
      }
    );
  }

  async findOnePost(id: string): Promise<Post> {
    let post: Post = await this.postsRepository.findOne({
      where: {
        id: id,
    },
    join: {
        alias: "post",
        leftJoinAndSelect: {
            "folders": "post.folders",
            "group": "folders.group"
        }
    },
    });

    post.folders.forEach((folder) => {
      console.log(folder.group)
      if (folder.group_id !== undefined && folder.group_id !== null) {
        folder.group = getBasicGroupInfo(folder.group);
      }
    })
    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    if (updatePostDto.folders !== undefined) {
      updatePostDto = await this.checkPostVisibilityUpdate(updatePostDto);
    }
    let updatePost: Post = await this.postsRepository.findOne({
      where: {
        id: id,
    },relations: {
        folders: true
      }});
    updatePost.post_description = updatePostDto.post_description;
    updatePost.post_tags = updatePostDto.post_tags;
    updatePost.post_title = updatePostDto.post_title; 
    updatePost.post_visibility = updatePostDto.post_visibility;
    if (updatePostDto.folders !== undefined) { 
    updatePost.folders = await this.updateFolders(updatePostDto.folders);
  }
    
    this.postsRepository.save(updatePost);
    return updatePost;
  }

  async checkPostVisibilityUpdate(post: UpdatePostDto):Promise<UpdatePostDto>{
    var check:Promise<UpdatePostDto> = new Promise((resolve, reject) => {
        let index = 1;
      post.folders.forEach(async (folderId) => {
        let folder: Folder = await this.foldersService.findOneFolder(folderId.id);
        // TODO: account for other visibility types
        if (folder.folder_visibility === visibility.PUBLIC && post.post_visibility != visibility.PUBLIC) {
          post.post_visibility = visibility.PUBLIC;
          resolve(post);
        }else if(post.folders.length <= index){
          post.post_visibility = visibility.PRIVATE;
          resolve(post);
        }else{
          index++;
        }}
      )
  });
  return check;
  }

  async updateFolders(folders: Folder[]):Promise<Folder[]>{
    var folderPromise:Promise<Folder[]> = new Promise((resolve, reject) => {
        let newfolders: Folder[] = [];
        let index =0;
        let limit = folders.length;
      folders.forEach(async (folderId) => {
        let folder: Folder = await this.foldersService.findOneFolder(folderId.id);
        newfolders.push(folder);
        index++;
        if (index >= limit) {
          resolve(newfolders);
        }
        });
  });
  return folderPromise;
  }

  async removePost(id: string) {
    return await this.postsRepository.delete(id);
  }
}


function getBasicGroupInfo(group:Group):Group{
  const cleanedGroup: Group = new Group();
  cleanedGroup.id = group.id;
  cleanedGroup.group_name = group.group_name;
  cleanedGroup.group_profile_picture = group.group_profile_picture;
  cleanedGroup.group_userlimit = group.group_userlimit;
  cleanedGroup.group_bio = group.group_bio;
  return cleanedGroup;

function getBasicUserInfo(user:User):User{
  const cleanedUser: User = new User();
  cleanedUser.id = user.id;
  cleanedUser.user_name = user.user_name;
  cleanedUser.user_subtitle = user.user_subtitle;
  cleanedUser.user_profile_picture = user.user_profile_picture;
  cleanedUser.user_deactivated = user.user_deactivated;
  cleanedUser.user_deactivation_date = user.user_deactivation_date;
  return cleanedUser;
}
