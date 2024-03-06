import { Module } from '@nestjs/common';
import { DirectmessagesService } from './directmessages.service';
import { DirectmessagesController } from './directmessages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directmessage } from './entities/directmessage.entity';

@Module({
  controllers: [DirectmessagesController],
  providers: [DirectmessagesService],
  imports: [TypeOrmModule.forFeature([Directmessage])],
})
export class DirectmessagesModule {}
