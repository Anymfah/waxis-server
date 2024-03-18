import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('posts')
export class PostsController {
  public constructor(private readonly postService: PostsService) {}

  @Get('')
  public async findAll(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  /**
   * Find one post
   * @param id Post id
   * @returns Post
   */
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  /**
   * @param post Post to create
   */
  @UseGuards(AuthGuard)
  @Post('')
  public async create(@Body() post: CreatePostDto): Promise<PostEntity> {
    console.log('POST', post);
    return await this.postService.create(post);
  }
}
