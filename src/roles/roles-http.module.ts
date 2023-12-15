import { Module } from '@nestjs/common';
import { RolesModule } from './roles.module';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [RolesModule],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesHttpModule {}
