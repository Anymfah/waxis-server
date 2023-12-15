import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly identifier: string;

  @IsNotEmpty()
  readonly password: string;
}
