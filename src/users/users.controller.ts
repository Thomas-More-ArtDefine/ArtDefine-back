import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
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

  
  @Post(':id/profile-images-upload')
  @UseInterceptors(FileInterceptor('file'),)
  // TODO: save file to cloud
  uploadFile(
    @Param('id') id: string, 
    @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 500000 }), // max file size of 500 kb
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // only upload png and jpeg images
      ]
    })
  ) file: Express.Multer.File) {
    this.usersService.saveProfilePicture(file,id);
    return file;
  }
}
