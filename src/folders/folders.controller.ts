import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async create(@Body() createFolderDto: CreateFolderDto) {
    try{
    return await this.foldersService.createFolder(createFolderDto);
  } catch (error) {
    if (error instanceof NotAcceptableException) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get()
  async findAll() {
    return await this.foldersService.findAllFolders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
    return await this.foldersService.findOneFolder(id);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Get(':id/posts')
  async getPosts(@Param('id') id: string) {
    try{
    return await this.foldersService.getAllPostsInFolder(id);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  @Get('user/:id')
  async findByUserId(@Param('id') id: string) {
    try{
    return await this.foldersService.findFoldersByUserId(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Get('group/:id')
  async findByGroupId(@Param('id') id: string) {
    try{
    return await this.foldersService.findFoldersByGroupId(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    try{
    return await this.foldersService.updateFolder(id, updateFolderDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.foldersService.removeFolder(id);
  }
}
