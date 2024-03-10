import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linksRepository: Repository<Link>,
  ) {}

  createLink(createLinkDto: CreateLinkDto) {
    if ((createLinkDto.group == null) && (createLinkDto.user == null)) {
      return "ERROR-link needs to be assigned to an owner.";
    }else if ((createLinkDto.group != null) && (createLinkDto.user != null)) {
      return "ERROR-link can only have one owner.";
    }else{
      this.linksRepository.save(createLinkDto);
      return createLinkDto;
    }
  }

  findAllLinks() {
    return this.linksRepository.find();
  }

  findOneLink(id: string) {
    return this.linksRepository.findOneBy({ id });
  }

  async updateLink(id: string, updateLinkDto: UpdateLinkDto) {
    let updateLink: Link = await this.linksRepository.findOneBy({ id });
    updateLink.link_name = updateLinkDto.link_name;
    updateLink.link_url = updateLinkDto.link_url;
    this.linksRepository.save(updateLink);
    return updateLink;
  }

  async removeLink(id: string) {
    return await this.linksRepository.delete(id);
  }
}
