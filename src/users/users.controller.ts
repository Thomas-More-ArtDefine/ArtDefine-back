import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { ProfileFilesSizeValidationPipe } from './validation_pipes/ProfileFilesSizeValidationPipe';
import { ProfileFilesTypesValidationPipe } from './validation_pipes/ProfileFilesTypesValidationPipe';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAllUsers();
    }catch(err){
      if(err instanceof NotFoundException){
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error("Something went wrong");
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOneUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Get(':id/basic')
  async findOneBasic(@Param('id') id: string) {
    try {
      return await this.usersService.findOneBasicUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Get(':id/following')
  async findFollowing(@Param('id') id: string) {
    try {
      return await this.usersService.findAllFollowing(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Get(':id/followers')
  async findFollowers(@Param('id') id: string) {
    try {
      return await this.usersService.findAllFollowers(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Get(':id/groups')
  async findGroups(@Param('id') id: string) {
    try {
      return await this.usersService.findAllGroups(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }

  @Patch('general-info/:id')
  async updateGeneralInfo(
    @Param('id') id: string,
    @Body() updateGeneralInfoDto: UpdateGeneralInfoDto,
  ) {
    try {
      return await this.usersService.updateGeneralInfo(id, updateGeneralInfoDto);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Patch('follow/:id')
  async follow(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.updateFollowing(id, updateUserDto);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    try {
      return await this.usersService.deactivateUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Patch('activate/:id')
  async activate(@Param('id') id: string) {
    try {
      return await this.usersService.activateUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.removeUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

  @Post('profile-images-upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile_picture', maxCount: 1 },
      { name: 'banner_picture', maxCount: 1 },
    ]),
  )
  // TODO: save files to cloud
  async uploadFile(
    @Param('id') id: string,
    @UploadedFiles(
      ProfileFilesSizeValidationPipe,
      ProfileFilesTypesValidationPipe,
    )
    files: {
      profile_picture?: Express.Multer.File[];
      banner_picture?: Express.Multer.File[];
    },
  ) {
    await this.usersService.saveProfileImages(files, id);
    return files;
  }
}
