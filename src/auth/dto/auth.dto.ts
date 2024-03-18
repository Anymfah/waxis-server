import { IsNotEmpty } from 'class-validator';
import { GetUserDto } from '../../users/dto/get-user.dto';

export class SignInDto {
  @IsNotEmpty()
  public readonly identifier: string;

  @IsNotEmpty()
  public readonly password: string;
}

export class LoginDto {
  public readonly access_token: string;
  public readonly data: GetUserDto;
}
