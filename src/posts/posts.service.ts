import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm/repository/Repository';
import { orderBy, visibility } from 'src/app.controller';
import { FoldersService } from 'src/folders/folders.service';
import { Folder } from 'src/folders/entities/folder.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { FeedbackQuestion } from 'src/feedback_questions/entities/feedback_question.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly foldersService: FoldersService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @async
   * @params {CreatePostDto}
   * @returns {Promise<Post>}
   * @throws {Error | NotAcceptableException | NotFoundException}
   */
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    try {
      createPostDto = await this.checkPostVisibilityUpload(createPostDto);

      if (!createPostDto.user.id) {
        throw new NotAcceptableException('No user id provided');
      }

      
    const user : User = await this.usersService.findOneUser(createPostDto.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
        
      return await this.postsRepository.save(createPostDto);
    } catch (err) {
      if (err instanceof NotAcceptableException) {
        throw new NotAcceptableException(err.message);
      } else if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new Error('Error while creating post: ' + err);
      
    }
  }

  /**
   * @async
   * @params {CreatePostDto}
   * @returns {Promise<CreatePostDto>}
   * @throws {Error}
   */
  async checkPostVisibilityUpload(post: CreatePostDto): Promise<CreatePostDto> {
    try {
      var check: Promise<CreatePostDto> = new Promise((resolve, reject) => {
        if (post.folders !== undefined && post.folders.length !== 0) {
          let index = 1;
          post.folders.forEach(async (folderId) => {
            let folder: Folder = await this.foldersService.findOneFolder(
              folderId.id,
            );
            // TODO: account for other visibility types
            if (
              folder.folder_visibility === visibility.PUBLIC &&
              post.post_visibility != visibility.PUBLIC
            ) {
              post.post_visibility = visibility.PUBLIC;
              resolve(post);
            } else if (post.folders.length <= index) {
              post.post_visibility = visibility.PRIVATE;
              resolve(post);
            } else {
              index++;
            }
          });
        } else {
          post.post_visibility = visibility.PRIVATE;
          resolve(post);
        }
      });
      return check;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @returns {Promise<Post[]>}
   * @throws {Error}
   */
  async findAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  /**
   * @async
   * @returns {Promise<Post[]>}
   * @throws {Error}
   */
  async findRandomPosts(
    numberPosts: number,
    exclude?: string,
  ): Promise<Post[]> {
    try {
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

      let index = 0;
      for (let timeout = 0; timeout < 1000; timeout++) {
        let id: string = (
          Math.floor(Math.random() * totalNumberPosts) + 1
        ).toString();

        if (!usedIds.includes(id)) {
          usedIds.push(id);

          let post: Post = await this.postsRepository.findOne({
            where: {
              id: id,
            },
            relations: {
              user: true,
            },
          });

          if (post === null) {
            break;
          }

          post.user = getBasicUserInfo(post.user);

          if (post.post_visibility === visibility.PUBLIC) {
            feedArray.push(post);
            index++;
          }
          if (index >= numberPosts) {
            break;
          }
        }
      }
      return feedArray;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @returns {Promise<Post[]>}
   * @throws {Error}
   */
  findAllByUserId(userid: string): Promise<Post[]> {
    try {
      return this.postsRepository.find({
        where: {
          user_id: userid,
        },
      });
    } catch (err) {
      throw err;
    }
  }


  /**
   * @async
   * @returns {Promise<Post[]>}
   * @throws {Error}
   */
  findAllByTag(tag: string): Promise<Post[]> {
    try{
    const query: string =
      "SELECT * FROM POST WHERE to_tsvector(post_tags) @@ to_tsquery('" +
      tag +
      "');";
    return this.postsRepository.query(query);
  }catch(err){
    throw new Error('Error while finding all by tag: ' + err);
  };
  }

  /**
   * @async
   * @param {string} tag
   * @param {number} amount
   * @param {string} order
   * @param {number} [skipAmount]
   * @returns {Promise<[Post[], number]>}
   * @throws {Error}
   */
  async findByTag(
    tag: string,
    amount: number,
    order: string,
    skipAmount?: number,
  ): Promise<[Post[], number]> {
    try {
      let filter: orderBy = orderBy.DESC;
      if (order && order.toUpperCase() === orderBy.ASC) {
        filter = orderBy.ASC;
      }

      const data = await this.postsRepository.findAndCount({
        where: { post_tags: Like('%' + tag + ',%') },
        take: amount,
        skip: skipAmount,
        order: {
          post_title: filter,
        },
        relations: {
          user: true,
        },
      });

      data[0].forEach((post) => {
        post.user = getBasicUserInfo(post.user);
      });

      return data;
    } catch (err) {
      throw new Error('Error while finding by tab: ' + err);
    }
  }


  /**
   * @async
   * @param string
   * @returns {Promise<Post>}
   * @throws {Error | NotFoundException}
   */
  async findOnePost(id: string): Promise<Post> {
    try {
      let post: Post = await this.postsRepository.findOne({
        where: {
          id: id,
        },
        join: {
          alias: 'post',
          leftJoinAndSelect: {
            folders: 'post.folders',
            group: 'folders.group',
            group_members: 'group.members',
            feedback_template: 'post.feedback_template',
            FeedbackQuestion: 'feedback_template.questions',
          },
        },
      });

      console.log(post);

      if (post === undefined || post === null) {
        console.log('Post not found');
        throw new NotFoundException('Post not found');
      }


      post.folders.forEach((folder) => {
        if (folder.group_id !== undefined && folder.group_id !== null) {
          folder.group = getBasicGroupInfo(folder.group);
        }
      });

      return post;
    } catch (err) {
      throw new Error('Error while finding one post: ' + err);
    }
  }



  /**
   * @async
   * @param id
   * @param updatePostDto
   * @returns {Promise<Post>}
   * @throws {Error | NotFoundException}
   */
  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    try{
    if (updatePostDto.folders !== undefined) {
      updatePostDto = await this.checkPostVisibilityUpdate(updatePostDto);
    }
    let updatePost: Post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        folders: true,
      },
    });

    if (updatePost === undefined || updatePost === null) {
      throw new NotFoundException('Post not found');
    }

    updatePost.post_description = updatePostDto.post_description;
    updatePost.post_tags = updatePostDto.post_tags;
    updatePost.post_title = updatePostDto.post_title;
    updatePost.post_visibility = updatePostDto.post_visibility;
    if (updatePostDto.folders !== undefined) {
      updatePost.folders = await this.updateFolders(updatePostDto.folders);
    }

    this.postsRepository.save(updatePost);
    return updatePost;
  }catch(err){
    throw new Error('Error while updating post: ' + err);
  };
  }


  /**
   * @async
   * @param UpdatePostDto
   * @returns {Promise<UpdatePostDto>} 
   * @throws {Error}
   */
  async checkPostVisibilityUpdate(post: UpdatePostDto): Promise<UpdatePostDto> {
    try{
    var check: Promise<UpdatePostDto> = new Promise((resolve, reject) => {
      let index = 1;
      post.folders.forEach(async (folderId) => {
        let folder: Folder = await this.foldersService.findOneFolder(
          folderId.id,
        );
        // TODO: account for other visibility types
        if (
          folder.folder_visibility === visibility.PUBLIC &&
          post.post_visibility != visibility.PUBLIC
        ) {
          post.post_visibility = visibility.PUBLIC;
          resolve(post);
        } else if (post.folders.length <= index) {
          post.post_visibility = visibility.PRIVATE;
          resolve(post);
        } else {
          index++;
        }
      });
    });
    return check;
  }catch(err){
    throw new Error('Error while checking post visibility: ' + err);
  };
  }


  /**
   * @async
   * @param folders
   * @returns {Promise<Folder[]>}
   * @throws {Error}
   */
  async updateFolders(folders: Folder[]): Promise<Folder[]> {
    try{
    var folderPromise: Promise<Folder[]> = new Promise((resolve, reject) => {
      let newfolders: Folder[] = [];
      let index = 0;
      let limit = folders.length;
      folders.forEach(async (folderId) => {
        let folder: Folder = await this.foldersService.findOneFolder(
          folderId.id,
        );
        newfolders.push(folder);
        index++;
        if (index >= limit) {
          resolve(newfolders);
        }
      });
    });
    return folderPromise;
  }catch(err){
    throw new Error('Error while updating folders: ' + err);
  };
  }


  /**
   * @async
   * @param {string}
   * @returns {Promise<Post>}
   */
  async removePost(id: string) {
    return await this.postsRepository.delete(id);
  }
}


/**
 *
 * @param group
 * @returns Group
 * @throws Error
 */
function getBasicGroupInfo(group: Group): Group {
  try{
  const cleanedGroup: Group = new Group();
  cleanedGroup.id = group.id;
  cleanedGroup.group_name = group.group_name;
  cleanedGroup.group_profile_picture = group.group_profile_picture;
  cleanedGroup.group_userlimit = group.group_userlimit;
  cleanedGroup.group_bio = group.group_bio;
  cleanedGroup.group_setting_visibility = group.group_setting_visibility;
  cleanedGroup.group_setting_join = group.group_setting_join;
  // used for membercount in groupcards
  if (group.members !== undefined && group.members !== null) {
    group.members.forEach((member) => {
      member.member_id = undefined;
      member.grouprank_id = undefined;
      member.member_join_date = undefined;
      member.id = undefined;
    });
    cleanedGroup.members = group.members;
  }
  return cleanedGroup;
}catch(err){
  throw new Error('Error while getting basic group info: ' + err);
};
}

/**
 *
 * @param user
 * @returns User
 * @throws Error
 */
function getBasicUserInfo(user: User): User {
  try {
    const cleanedUser: User = new User();
    cleanedUser.id = user.id;
    cleanedUser.user_name = user.user_name;
    cleanedUser.user_subtitle = user.user_subtitle;
    cleanedUser.user_profile_picture = user.user_profile_picture;
    cleanedUser.user_deactivated = user.user_deactivated;
    cleanedUser.user_deactivation_date = user.user_deactivation_date;
    return cleanedUser;
  } catch (err) {
    throw new Error('Error while getting basic user info: ' + err);
  }
}
