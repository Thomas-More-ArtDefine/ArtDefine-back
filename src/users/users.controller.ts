import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles } from '@nestjs/common';
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }
  @Get(':id/following')
  findFollowing(@Param('id') id: string) {
    return this.usersService.findAllFollowing(id);
  }

  @Get(':id/followers')
  findFollowers(@Param('id') id: string) {
    return this.usersService.findAllFollowers(id);
  }

  @Get(':id/groups')
  findGroups(@Param('id') id: string) {
    return this.usersService.findAllGroups(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }

  @Patch('general-info/:id')
  updateGeneralInfo(@Param('id') id: string, @Body() updateGeneralInfoDto: UpdateGeneralInfoDto) {
    return this.usersService.updateGeneralInfo(id, updateGeneralInfoDto);
  }

  @Patch('follow/:id')
  follow(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateFollowing(id, updateUserDto);
  }

  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivateUser(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.usersService.activateUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  
  @Post('profile-images-upload/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profile_picture', maxCount: 1 },
    { name: 'banner_picture', maxCount: 1 },
  ]))
  // TODO: save files to cloud
  uploadFile(
    @Param('id') id: string, 
    @UploadedFiles(
      ProfileFilesSizeValidationPipe,
      ProfileFilesTypesValidationPipe
  ) files:  { profile_picture?: Express.Multer.File[], banner_picture?: Express.Multer.File[] }) {
    this.usersService.saveProfileImages(files,id);
    return files;
  }
}
