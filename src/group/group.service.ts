import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  createGroup(createGroupDto: CreateGroupDto) {
    this.groupsRepository.save(createGroupDto);
    return createGroupDto;
  }

  findAllGroups() {
    return this.groupsRepository.find();
  }

  findOneGroup(id: string) {
    return this.groupsRepository.findOneBy({ id });
  }

  async updateGroup(id: string, updateGroupDto: UpdateGroupDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    
    updateGroup.group_name = updateGroupDto.group_name;
    updateGroup.group_bio = updateGroupDto.group_bio;
    updateGroup.group_profile_picture = updateGroupDto.group_profile_picture;
    updateGroupDto.group_banner_picture = updateGroupDto.group_banner_picture;
    updateGroup.group_userlimit = updateGroupDto.group_userlimit;

    if ((updateGroup.group_queued_deletion === false) && (updateGroupDto.group_queued_deletion === true)) {
      updateGroup.group_queued_deletion = updateGroupDto.group_queued_deletion;
      updateGroup.group_queued_deletion_date = new Date();
    }

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  async removeGroup(id: string) {
    return await this.groupsRepository.delete(id);
  }
}
