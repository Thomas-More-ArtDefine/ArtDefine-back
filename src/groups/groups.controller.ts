import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupJoin, GroupVisibility } from './entities/group.entity';
import { UpdateGroupSettingsDto } from './dto/update-group-settings.dto';
import { UpdateGroupDeletionDto } from './dto/update-group-deletion.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    try {
      return await this.groupsService.createGroup(createGroupDto);
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.groupsService.findAllGroups();
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search/name/:name')
  async getByName(
    @Param('name') name: string,
    @Query('amount') amount: number,
    @Query('orderby') orderby: string,
    @Query('skip') skip: number,
  ) {
    try {
      return await this.groupsService.findGroupsByName(
        name,
        amount,
        orderby,
        skip,
      );
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('search/visibility/:visibility')
  async getByVisibility(
    @Param('visibility') visibility: GroupVisibility,
    @Query('amount') amount: number,
    @Query('orderby') orderby: string,
    @Query('skip') skip: number,
  ) {
    try {
      return await this.groupsService.findGroupsByVisibility(
        visibility,
        amount,
        orderby,
        skip,
      );
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('search/join/:join')
  async getByJoinSetting(
    @Param('join') join: GroupJoin,
    @Query('amount') amount: number,
    @Query('orderby') orderby: string,
    @Query('skip') skip?: number,
  ) {
    try {
      return await this.groupsService.findGroupsByJoinMethod(
        join,
        amount,
        orderby,
        skip,
      );
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const group: Group = await this.groupsService.findOneGroup(id);
      if (!group) {
        throw new NotFoundException('Group not found');
      } else {
        return group;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get(':id/members')
  async findMembers(@Param('id') id: string) {
    try {
      return await this.groupsService.getGroupMembers(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    try {
      return await this.groupsService.updateGroupGeneral(id, updateGroupDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof NotAcceptableException) {
        return new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id/settings')
  async updateSettings(
    @Param('id') id: string,
    @Body() updateGroupSettingsDto: UpdateGroupSettingsDto,
  ) {
    try {
      return await this.groupsService.updateGroupSettings(
        id,
        updateGroupSettingsDto,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Patch(':id/deletion')
  async setDeletion(
    @Param('id') id: string,
    @Body() updateGroupDeletionDto: UpdateGroupDeletionDto,
  ) {
    try {
      return await this.groupsService.updateGroupDeletion(
        id,
        updateGroupDeletionDto,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.groupsService.removeGroup(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
