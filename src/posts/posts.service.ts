import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  public constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  getPost() {
    return 'test';
  }

  /**
   * Find all posts
   */
  public findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  /**
   * Find one posts
   */
  public findOne(id: number): Promise<PostEntity> {
    return this.postRepository.findOneBy({ id });
  }

  /**
   * Create a posts
   */
  public async create(post: CreatePostDto): Promise<PostEntity> {
    console.log('POST', post);
    return this.postRepository.save(this.postRepository.create(post));
  }

  /**
   * Update a posts
   */
  public async update(id: number, post: PostEntity): Promise<PostEntity> {
    await this.postRepository.update(id, post);
    return await this.postRepository.findOneBy({ id });
  }
}
