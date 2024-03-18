import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post('user')
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  public async findAll() {
    return await this.usersService.findAll();
  }

  @Get('debug-users')
  public async findAllDebug() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('user/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('teslalog')
  teslaLogGet(@Req() request: Request) {
    // EU_670875865edc0828acc172f0ea466ef9164ad65238b8adf1d41117e6835e
    console.log('teslalog get, params:', request);
    console.log('token:', request['query']);
  }

  @Get('token')
  tokenGet(@Req() request: Request) {
    // EU_670875865edc0828acc172f0ea466ef9164ad65238b8adf1d41117e6835e
    console.log('teslatoken get, params:', request);
  }

  /**
   * Calls the Tesla API to get the list of vehicles
   * Returns the list of vehicles
   */
  @Get('fleet')
  async teslaFleetGet() {
    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InE0dHg3Q1UyYzI2V1BiemwxZjZjanM3QnhzayJ9.eyJpc3MiOiJodHRwczovL2F1dGgudGVzbGEuY29tL29hdXRoMi92My9udHMiLCJhenAiOiI1NjhiMjIxYzI4ZWYtNDIxMC1iNjE0LTI2MDI1MmU0NDhmZCIsInN1YiI6ImRjZGJiNGRiLWUyNTMtNDczNS1iMGI4LTNhMjA5NDBiZTU1YyIsImF1ZCI6WyJodHRwczovL2ZsZWV0LWFwaS5wcmQubmEudm4uY2xvdWQudGVzbGEuY29tIiwiaHR0cHM6Ly9mbGVldC1hcGkucHJkLmV1LnZuLmNsb3VkLnRlc2xhLmNvbSIsImh0dHBzOi8vYXV0aC50ZXNsYS5jb20vb2F1dGgyL3YzL3VzZXJpbmZvIl0sInNjcCI6WyJvcGVuaWQiLCJvZmZsaW5lX2FjY2VzcyIsInVzZXJfZGF0YSIsInZlaGljbGVfZGV2aWNlX2RhdGEiLCJ2ZWhpY2xlX2NtZHMiLCJ2ZWhpY2xlX2NoYXJnaW5nX2NtZHMiLCJlbmVyZ3lfZGV2aWNlX2RhdGEiXSwiYW1yIjpbInB3ZCIsIm1mYSIsIm90cCJdLCJleHAiOjE3MDY0OTQyMDEsImlhdCI6MTcwNjQ2NTQwMSwib3VfY29kZSI6IkVVIiwibG9jYWxlIjoiZnItRlIiLCJhdXRoX3RpbWUiOjE3MDY0NjUzODEsIm5vbmNlIjoiODA0NzY4MDk0OTgifQ.cHaCc2oIJJWvG64i991H3KGnhBuYRhYvWoOgPsDlXZus03sc3sJ5drti0tSKJDCUOO5y5fGfkRkLXnl8vP6MhGvFlnGsmclTOlb7aWtIn6AJuiwt_vPZEZyyr_A0m_HYdz3Zx2GCetfhZfCERipIgF7k-deOS9kxmTKTOA-vp8Wo3q1XVk0cwTPS2QjAQ5oyx_ocWhSe6hbUnZaWau7dH8_dwS61EeuuVWWuFAJL6Yl1iIQJZdNZyOzbzrRIVasXDkwGNFpyll0KJJws8p2rCdsjqPHq7OogxUgmppu54-_Q68ioaDXimFX6taoBa3wMaFZrHDdGrTIhQc3GUhjKWQ';
    const url = 'https://fleet-api.prd.na.vn.cloud.tesla.com/api/1/vehicles';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    //const data = await response.json();

    console.log('teslaFleetGet', response);
    return response;
  }
}
