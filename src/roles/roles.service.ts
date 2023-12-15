import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  public constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  public async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(
      this.roleRepository.create(createRoleDto),
    );
  }

  public async findAll() {
    return await this.roleRepository.find();
  }

  public async findOne(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOneBy({ id });
  }

  public async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    return await this.roleRepository.save(
      this.roleRepository.create({
        ...updateRoleDto,
        id,
      }),
    );
  }

  public async remove(id: number) {
    return await this.roleRepository.delete(id);
  }
}
