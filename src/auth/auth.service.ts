import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login a user
   */
  public async signIn(identifier: string, password: string): Promise<LoginDto> {
    const isEmail = identifier.includes('@');
    const _user: UserEntity | undefined = isEmail
      ? await this.usersService.findOneByEmail(identifier)
      : await this.usersService.findOneByUsername(identifier);

    if (!_user || _user?.password !== password) {
      throw new HttpException({ message: 'Invalid credentials' }, 404);
    }

    const payload = {
      username: _user.username,
      sub: _user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: _user,
    };
  }

  /**
   * Get the user session data from the token
   */
  public async getSession(token: string): Promise<UserEntity> {
    const payload = this.jwtService.verify(token);
    console.log('payload:', payload);
    return await this.usersService.findOne(payload.sub);
  }

  /**
   * canActivate
   * @param token
   */
  public async canActivate(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
