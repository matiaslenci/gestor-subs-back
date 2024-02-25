import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayLoad } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        user: { ...user },
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        avatar: true,
        roles: true,
        fullName: true,
        isActive: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Credenciales no validas(email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no validas(password)');

    delete user.password;

    return {
      user: { ...user },
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const userExists = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (userExists) {
          throw new BadRequestException('Email ya registrado');
        }
      }

      const { fullName, email, avatar, ...userData } = updateUserDto;

      const userUpdated = await this.userRepository.preload({
        id: user.id,
        fullName: fullName ? fullName : user.fullName,
        email: email ? email : user.email,
        avatar: avatar ? avatar : user.avatar,
        ...userData,
      });

      await this.userRepository.save(userUpdated);

      return {
        ...userUpdated,
        token: this.getJwtToken({ id: userUpdated.id }),
      };
    } catch (error) {
      console.error(error);

      this.handleDBErrors(error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      user: { ...user },
      token: this.getJwtToken({ id: user.id }),
    };
  }

  getRepo() {
    return this.userRepository;
  }

  private getJwtToken(payload: JwtPayLoad) {
    const token = this.jwtService.sign(payload); //? Sign(firmar jwt)
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException('Error email ya registrado', error.detail);

    throw new InternalServerErrorException(
      'Please check server logs',
      error.detail,
    );
  }
}
