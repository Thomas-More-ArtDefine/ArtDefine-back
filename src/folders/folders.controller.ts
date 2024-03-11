import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.createFolder(createFolderDto);
  }

  @Get()
  findAll() {
    return this.foldersService.findAllFolders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foldersService.findOneFolder(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.foldersService.findFoldersByUserId(id);
  }

  @Get('group/:id')
  findByGroupId(@Param('id') id: string) {
    return this.foldersService.findFoldersByGroupId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.updateFolder(id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foldersService.removeFolder(id);
  }
}
