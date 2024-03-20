import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch('deactivate/:id')
  activate(@Param('id') id: string) {
    return this.usersService.activateUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
