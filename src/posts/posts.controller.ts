import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try{
    return await this.postsService.createPost(createPostDto);
    }catch(error){
      
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof NotAcceptableException){
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try{
    return await this.postsService.findAllPosts();
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get('tag/all/:tag')
  async getAllByTag(@Param('tag') tag: string){
    try{
    return await this.postsService.findAllByTag(tag);
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get('tag/:tag')
  async getByTag(
    @Param('tag') tag: string,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skipAmount') skipAmount?: number
  ){
    try{
    return await this.postsService.findByTag(tag, amount, orderby, skipAmount);
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get('search/title/:title')
  async getByTitle(
    @Param('title') title: string,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skipAmount') skipAmount?: number
  ){
    try{
    return await this.postsService.findByName(title, amount, orderby, skipAmount);
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get('feed/random')
  async getRandomFeed( @Query('amount') amount:number, @Query('exclude') exclude: string) {
    try{
    if (amount !== undefined) {
      return await this.postsService.findRandomPosts(amount, exclude);
    }else{
      return await this.postsService.findRandomPosts(10, exclude);
    }
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  };
  }

  @Get('user/:id')
  async findByUserId(@Param('id') id: string) {
    try{
    return await this.postsService.findAllByUserId(id);
  }catch(error){
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      console.log('searching for post with id : ', id);
    return await this.postsService.findOnePost(id);
  }catch(error){
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    } else {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try{
    return await this.postsService.updatePost(id, updatePostDto);
  }catch(error){
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    } else {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.removePost(id);
  }
}
