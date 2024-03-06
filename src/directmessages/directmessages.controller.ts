import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectmessagesService } from './directmessages.service';
import { CreateDirectmessageDto } from './dto/create-directmessage.dto';
import { UpdateDirectmessageDto } from './dto/update-directmessage.dto';

@Controller('directmessages')
export class DirectmessagesController {
  constructor(private readonly directmessagesService: DirectmessagesService) {}

  @Post()
  create(@Body() createDirectmessageDto: CreateDirectmessageDto) {
    return this.directmessagesService.sendMessage(createDirectmessageDto);
  }

  @Get(':receiver_id/:sender_id')
  findOne(@Param('sender_id') sender_id: string, @Param('receiver_id') receiver_id: string) {
    return this.directmessagesService.findAllMessagesFromChat(sender_id, receiver_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectmessageDto: UpdateDirectmessageDto) {
    return this.directmessagesService.editMessage(id, updateDirectmessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directmessagesService.deleteMessage(id);
  }
}
