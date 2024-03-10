import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { Link } from './entities/link.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [TypeOrmModule.forFeature([Link])],
})
export class LinksModule {}
