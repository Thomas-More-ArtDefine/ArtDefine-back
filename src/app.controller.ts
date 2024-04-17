import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export enum visibility {
  PRIVATE = "private",
  SELECTIVE = "selective",
  LINK = "link",
  PUBLIC = "public"
}

export enum orderBy {
  DESC = "DESC",
  ASC = "ASC"
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
