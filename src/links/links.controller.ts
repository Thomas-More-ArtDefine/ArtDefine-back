import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    try {
      return await this.linksService.createLink(createLinkDto);
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
      return await this.linksService.findAllLinks();
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.linksService.findOneLink(id);
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
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    try {
      return await this.linksService.updateLink(id, updateLinkDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.linksService.removeLink(id);
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
