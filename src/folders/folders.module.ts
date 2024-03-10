import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';

@Module({
  controllers: [FoldersController],
  providers: [FoldersService],
  imports: [TypeOrmModule.forFeature([Folder])],
})
export class FoldersModule {}
