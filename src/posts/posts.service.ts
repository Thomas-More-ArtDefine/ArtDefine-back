import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm/repository/Repository';

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

  findAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
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
    return this.postsRepository.findOneBy({ id });
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
