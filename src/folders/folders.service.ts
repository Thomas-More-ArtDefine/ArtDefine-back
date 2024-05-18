import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}

  async createFolder(createFolderDto: CreateFolderDto) {
    if ((createFolderDto.group == null) && (createFolderDto.user == null)) {
      return "ERROR-folder needs to be assigned to an owner.";
    }else if ((createFolderDto.group != null) && (createFolderDto.user != null)) {
      return "ERROR-folder can only have one owner.";
    }else{
      let queryResult;
      if (createFolderDto.group !== null && createFolderDto.group !== undefined) {
        queryResult = this.foldersRepository.findAndCount({
          where: {
            group_id: createFolderDto.group.id,
          }
        });
      }
      
      else{
        queryResult = this.foldersRepository.findAndCount({
          where: {
            user_id: createFolderDto.user.id,
          }
        });
        
      }

      const count: any  = await queryResult;
      createFolderDto.folder_order = count[1] + 1;
      this.foldersRepository.save(createFolderDto);
      return createFolderDto;
    }
  }

  findAllFolders() {
    return this.foldersRepository.find();
  }

  findOneFolder(id: string) {
    return this.foldersRepository.findOneBy({ id });
  }

  async findFoldersByGroupId(id: string) {
    return getBasicPosts(await this.foldersRepository.find({
      where: {
        group_id: id
      },
      join: {
        alias: "folder",
        leftJoinAndSelect: {
            "posts": "folder.posts",
            "user": "posts.user"
        }
      }
    }));
  }

  async findFoldersByUserId(id: string) {
    const folders: Folder[] = getBasicPosts(await this.foldersRepository.find({
      where: {
        user_id: id
      },
      join: {
          alias: "folder",
          leftJoinAndSelect: {
              "posts": "folder.posts",
              "user": "posts.user"
          }
        }
    }))

    return folders
  }

  async getAllPostsInFolder(id: string){
    const folder: Folder = await this.foldersRepository.findOne({
      where: {
        id: id
      },
      relations: {
        posts: true
      }
    });

    return folder.posts;
  }

  async updateFolder(id: string, updateFolderDto: UpdateFolderDto) {
    let updateFolder: Folder = await this.foldersRepository.findOneBy({ id });
    updateFolder.folder_name = updateFolderDto.folder_name;
    updateFolder.folder_description = updateFolderDto.folder_bio;
    updateFolder.folder_archived = updateFolderDto.folder_archived;
    updateFolder.folder_visibility = updateFolderDto.folder_visibility;
    this.foldersRepository.save(updateFolder);
    return updateFolder;
  }

  async removeFolder(id: string) {
    return await this.foldersRepository.delete(id);
  }
}

function getBasicPosts(folders: Folder[]):Folder[]{
  folders.forEach((folder)=>{
    folder.posts.forEach((post)=>{
      post.user = getBasicUserInfo(post.user);
    })
  })
  return folders;
}

function getBasicUserInfo(user:User):User{
  const cleanedUser: User = new User();
  cleanedUser.user_name = user.user_name;
  cleanedUser.user_subtitle = user.user_subtitle;
  cleanedUser.user_profile_picture = user.user_profile_picture;
  return cleanedUser;
}