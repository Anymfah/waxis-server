import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthUser } from '../users/user.decorator';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  /**
   * Sign in a user
   * @param signInDto
   * @returns User data and access token
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() signInDto: SignInDto): Record<string, any> {
    return this.authService.signIn(signInDto.identifier, signInDto.password);
  }

  /**
   * @route GET /me
   * Get the user session data from the token
   * @returns User data and access token
   */
  @ApiOperation({ summary: 'Get the user session data from the token' })
  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(AuthGuard)
  public getSession(
    @AuthUser() user: Record<string, any>,
  ): Record<string, any> {
    return user;
  }
}
