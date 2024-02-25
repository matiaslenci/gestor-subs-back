import { Controller, Post, Body, Get, HttpCode, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('update')
  @Auth()
  updateUser(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(user, updateUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
