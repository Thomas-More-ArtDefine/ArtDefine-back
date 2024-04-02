import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm/repository/Repository';
import { visibility } from 'src/app.controller';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    this.postsRepository.save(createPostDto);
    return createPostDto;
  }

  async findAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findRandomPosts(numberPosts: number): Promise<Post[]> {
    const totalNumberPosts: number = await this.postsRepository.count();
    let feedArray: Post[] = [];
    let index = 0
    for (let timeout = 0; index < numberPosts; timeout++) {
      let id: string = (Math.floor(Math.random() * totalNumberPosts)+1).toString();
      let post:Post = await this.postsRepository.findOneBy({id});
      if (post.post_visibility === visibility.PUBLIC) {
        feedArray.push(post);
        index++
      }
      if (timeout > 50) {
        break;
      }
    }
    return feedArray;
  }

  findAllByUserId(userid: string): Promise<Post[]> {
    return this.postsRepository.find(
      {
        where: {
          user_id: userid,
      },
      }
    );
  }

  findOnePost(id: string): Promise<Post> {
    return this.postsRepository.findOne({
      where: {
        id: id,
    },
    relations: {
      folders: true
    }
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    let updatePost: Post = await this.postsRepository.findOneBy({ id });
    updatePost.post_description = updatePostDto.post_description;
    updatePost.post_tags = updatePostDto.post_tags;
    updatePost.post_title = updatePostDto.post_title; 
    this.postsRepository.save(updatePost);
    return updatePost;
  }

  async removePost(id: string) {
    return await this.postsRepository.delete(id);
  }
}
