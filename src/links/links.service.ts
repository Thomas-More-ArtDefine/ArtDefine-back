import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * @async
   * @param CreateLinkDto
   * @returns Promise<Link>
   * @throws {Error | NotAcceptableException}
   */
  async createLink(createLinkDto: CreateLinkDto) {
    try {
      if (createLinkDto.group == null && createLinkDto.user == null) {
        throw new NotAcceptableException(
          'link needs to be assigned to an owner.',
        );
      } else if (createLinkDto.group != null && createLinkDto.user != null) {
        throw new NotAcceptableException('link can only have one owner.');
      } else {
        await this.linksRepository.save(createLinkDto);
        return createLinkDto;
      }
    } catch (err) {
      throw new Error('Error creating link :' + err);
    }
  }

  /**
   * @async
   * @returns Promise<Link[]>
   * @throws {Error}
   */
  async findAllLinks(): Promise<Link[]> {
    try {
      return await this.linksRepository.find();
    } catch (err) {
      throw new Error('Error finding all links : ' + err);
    }
  }

  /**
   * @async
   * @param id - string
   * @returns Promise<Link>
   * @throws {Error | NotFoundException}
   */
  async findOneLink(id: string): Promise<Link> {
    try {
      const link: Link = await this.linksRepository.findOneBy({ id });
      if (!link) {
        throw new NotFoundException('Link not found');
      }
      return link;
    } catch (err) {
      throw new Error('Error finding link by ID : ' + err);
    }
  }

  /**
   * @async
   * @param id - string
   * @param updateLinkDto - UpdateLinkDto
   * @returns Promise<Link>
   * @throws {Error | NotFoundException}
   */
  async updateLink(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      let updateLink: Link = await this.linksRepository.findOneBy({ id });
      if (!updateLink) {
        throw new NotFoundException('Link to update not found');
      }
      updateLink.link_name = updateLinkDto.link_name;
      updateLink.link_url = updateLinkDto.link_url;
      this.linksRepository.save(updateLink);
      return updateLink;
    } catch (err) {
      throw new Error('Error updating link : ' + err);
    }
  }

  /**
   * @async
   * @param id - string
   * @returns Promise<DeleteResult>
   * @throws {Error}
   */
  async removeLink(id: string) {
    try {
      return await this.linksRepository.delete(id);
    } catch (err) {
      throw new Error('Error removing link : ' + err);
    }
  }
}
