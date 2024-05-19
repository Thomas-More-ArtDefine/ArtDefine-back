import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseArrayPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAllPosts();
  }

  @Get('tag/all/:tag')
  getAllByTag(@Param('tag') tag: string){
    return this.postsService.findAllByTag(tag);
  }

  @Get('tag/:tag')
  getByTag(
    @Param('tag') tag: string,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skipAmount') skipAmount?: number
  ){
    return this.postsService.findByTag(tag, amount, orderby, skipAmount);
  }

  @Get('feed/random')
  getRandomFeed( @Query('amount') amount:number, @Query('exclude') exclude: string) {
    if (amount !== undefined) {
      return this.postsService.findRandomPosts(amount, exclude);
    }else{
      return this.postsService.findRandomPosts(10, exclude);
    }
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.postsService.findAllByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOnePost(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.removePost(id);
  }
}
