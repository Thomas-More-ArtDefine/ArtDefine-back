import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly foldersRepository: Repository<Folder>,
  ) {}
  createFolder(createFolderDto: CreateFolderDto) {
    if ((createFolderDto.group == null) && (createFolderDto.user == null)) {
      return "ERROR-folder needs to be assigned to an owner.";
    }else if ((createFolderDto.group != null) && (createFolderDto.user != null)) {
      return "ERROR-folder can only have one owner.";
    }else{
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

  findFoldersByGroupId(id: string) {
    return this.foldersRepository.find({
      where: {
        group_id: id
      }
    });
  }

  findFoldersByUserId(id: string) {
    return this.foldersRepository.find({
      where: {
        user_id: id
      }
    });
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
