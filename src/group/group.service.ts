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

  create(createGroupDto: CreateGroupDto) {
    this.groupsRepository.save(createGroupDto);
    return createGroupDto;
  }

  findAll() {
    return this.groupsRepository.find();
  }

  findOne(id: string) {
    return this.groupsRepository.findOneBy({ id });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    
    updateGroup.group_name = updateGroupDto.group_name;
    updateGroup.group_bio = updateGroupDto.group_bio;
    updateGroup.group_profile_picture = updateGroupDto.group_profile_picture;
    updateGroupDto.group_banner_picture = updateGroupDto.group_banner_picture;
    updateGroup.group_userlimit = updateGroupDto.group_userlimit;
    updateGroup.group_queued_deletion = updateGroupDto.group_queued_deletion;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  async remove(id: string) {
    await this.groupsRepository.delete(id);
  }
}
