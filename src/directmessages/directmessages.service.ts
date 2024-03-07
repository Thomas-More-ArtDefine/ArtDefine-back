import { Injectable } from '@nestjs/common';
import { CreateDirectmessageDto } from './dto/create-directmessage.dto';
import { UpdateDirectmessageDto } from './dto/update-directmessage.dto';
import { Directmessage } from './entities/directmessage.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common';

@Injectable()
export class DirectmessagesService {
  constructor(
    @InjectRepository(Directmessage)
    private readonly messagesRepository: Repository<Directmessage>,
  ) {}

  sendMessage(createMessageDto: CreateDirectmessageDto) {
    return this.messagesRepository.save(createMessageDto);;
  }

  async findAllMessagesFromChat(id_sender:string,id_receiver:string) {
    let chatMessages: Directmessage[] = await this.messagesRepository.find(
      {
        where: [
          {
            sender_id: id_sender,
            receiver_id: id_receiver
          },
          {
            sender_id: id_receiver,
            receiver_id: id_sender
          }
        ]
      
      }
    )
    return chatMessages;
  }

  async editMessage(id: string, updateMessageDto: UpdateDirectmessageDto) {
    const editedMessage: Directmessage = await this.messagesRepository.findOneBy({ id });
    editedMessage.message_content = updateMessageDto.message_content;
    return this.messagesRepository.save(editedMessage);
  }

  async deleteMessage(id: string) {
    return await this.messagesRepository.delete(id);
  }
}
