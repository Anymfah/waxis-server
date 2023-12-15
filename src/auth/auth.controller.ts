import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() signInDto: SignInDto): Record<string, any> {
    return this.authService.signIn(signInDto.identifier, signInDto.password);
  }
}
