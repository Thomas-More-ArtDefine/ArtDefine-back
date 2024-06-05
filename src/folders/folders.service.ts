import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * @async
   * @param createFolderDto
   * @returns Promise<Folder>
   * @throws {error | NotAcceptableException}
   */
  async createFolder(createFolderDto: CreateFolderDto) {
    try {
      if (createFolderDto.group == null && createFolderDto.user == null) {
        throw new NotAcceptableException(
          'folder needs to be assigned to an owner.',
        );
      } else if (
        createFolderDto.group != null &&
        createFolderDto.user != null
      ) {
        throw new NotAcceptableException(
          'folder can only have one owner.',
        );
      } else {
        let queryResult;
        if (
          createFolderDto.group !== null &&
          createFolderDto.group !== undefined
        ) {
          queryResult = this.foldersRepository.findAndCount({
            where: {
              group_id: createFolderDto.group.id,
            },
          });
        } else {
          queryResult = this.foldersRepository.findAndCount({
            where: {
              user_id: createFolderDto.user.id,
            },
          });
        }

        const count: any = await queryResult;
        createFolderDto.folder_order = count[1] + 1;
        this.foldersRepository.save(createFolderDto);
        return createFolderDto;
      }
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException(
          'Error creating folder :' + error.message,
        );
      } else {
        throw new Error('Error creating folder :' + error);
      }
    }
  }

  findAllFolders() {
    return this.foldersRepository.find();
  }

  /**
   * @async
   * @param id
   * @returns Promise<Folder>
   * @throws NotFoundException
   */
  async findOneFolder(id: string) {
    try {
      const folder: Folder = await this.foldersRepository.findOneBy({ id });
      if (folder == null || folder == undefined) {
        throw new NotFoundException('Folder not found');
      }
      return folder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'Error finding folder by ID' + error.message,
        );
      } else {
        throw new Error('Error finding folder by ID :' + error);
      }
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<Folder[]>
   * @throws {NotAcceptableException | Error}
   */
  async findFoldersByGroupId(id: string) {
    try {
      return getBasicPosts(
        await this.foldersRepository.find({
          where: {
            group_id: id,
          },
          join: {
            alias: 'folder',
            leftJoinAndSelect: {
              posts: 'folder.posts',
              user: 'posts.user',
            },
          },
        }),
      );
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException(
          'Error getting basic posts :' + error.message,
        );
      } else {
        throw new Error('Error getting basic posts :' + error);
      }
    }
  }


  /**
   * @async
   * @param id
   * @returns Promise<Folder[]>
   * @throws {NotAcceptableException | Error}
   */
  async findFoldersByUserId(id: string) {
    try {
      const folders: Folder[] = getBasicPosts(
        await this.foldersRepository.find({
          where: {
            user_id: id,
          },
          join: {
            alias: 'folder',
            leftJoinAndSelect: {
              posts: 'folder.posts',
              user: 'posts.user',
            },
          },
        }),
      );

      return folders;
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException(
          'Error getting basic posts :' + error.message,
        );
      } else {
        throw new Error('Error getting basic posts :' + error);
      }
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<Post[]>
   * @throws NotFoundException
   * @throws {Error}
   * @throws {NotAcceptableException}
   */

  async getAllPostsInFolder(id: string) {
    const folder: Folder = await this.foldersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        posts: true,
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return folder.posts;
  }


  /**
   * @async
   * @param id
   * @param updateFolderDto
   * @returns Promise<Folder>
   * @throws {NotAcceptableException}
    */
  async updateFolder(id: string, updateFolderDto: UpdateFolderDto) {
    if (!updateFolderDto) {
      throw new NotAcceptableException('No update folder data given');
    }
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

/**
 *
 * @param folders
 * @returns Folder[]
 * @throws {NotAcceptableException | Error}
 */
function getBasicPosts(folders: Folder[]): Folder[] {
  try {
    if (!folders) {
      throw new NotAcceptableException('No folders given');
    }
    folders.forEach((folder) => {
      folder.posts.forEach((post) => {
        post.user = getBasicUserInfo(post.user);
      });
    });
    return folders;
  } catch (error) {
    if (error instanceof NotAcceptableException) {
      throw new NotAcceptableException(
        'Error getting basic posts :' + error.message,
      );
    } else {
      throw new Error('Error getting basic posts :' + error);
    }
  }
}

/**
 *
 * @param user
 * @returns User
 * @throws {NotAcceptableException}
 */
function getBasicUserInfo(user: User): User {
  if (!user) {
    throw new NotAcceptableException('No user given');
  }
  const cleanedUser: User = new User();
  cleanedUser.id = user.id;
  cleanedUser.user_name = user.user_name;
  cleanedUser.user_subtitle = user.user_subtitle;
  cleanedUser.user_profile_picture = user.user_profile_picture;
  return cleanedUser;
}
