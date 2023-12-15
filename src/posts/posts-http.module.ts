import { PostsModule } from './posts.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [PostsModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsHttpModule {}
