import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Check uniqueness of username/email
    const { username, email, password } = createUserDto;
    const qb = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { email: 'Email already exists.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    } else {
      return await this.userRepository.save(newUser);
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async update(id: number, dto: UpdateUserDto) {
    const toUpdate = await this.userRepository.findOneBy({ id });
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ username });
  }
}
