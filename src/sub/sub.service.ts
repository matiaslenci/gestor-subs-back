import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';
import { Sub } from './entities/sub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorService } from '../color/color.service';
import { handleDBExceptions } from '../common/utils/handleDBException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { User } from '../auth/entities/user.entity';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class SubService {
  private key = process.env.CRYPTO_KEY;

  constructor(
    @InjectRepository(Sub)
    private readonly subRepository: Repository<Sub>,
    private colorSrv: ColorService,
  ) {}

  async create(createSubDto: CreateSubDto, user: User) {
    const colorFound = await this.colorSrv.findOne(createSubDto.colorId);

    const { password, ...detailsSub } = createSubDto;

    if (!colorFound)
      throw new NotFoundException(
        `Color con id:${createSubDto.colorId} no encontrado`,
      );

    const encryptedPassword = this.encrypt(password);

    try {
      const sub = this.subRepository.create({
        password: encryptedPassword,
        ...detailsSub,
        user,
      });
      await this.subRepository.save(sub);

      delete sub.password;

      return { sub, ...sub.color };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.subRepository.find({
      take: limit,
      skip: offset,
      relations: ['color'],
    });
  }

  findAllByUser(user: User) {
    return this.subRepository.find({
      relations: ['color'],
      where: { user: { id: user.id } },
    });
  }

  async findOne(term: string) {
    let sub: Sub;

    if (isUUID(term)) {
      sub = await this.subRepository.findOneBy({ id: term });
    }

    if (!sub) throw new NotFoundException(`sub ${term} no encontrado`);

    sub.password = await this.decrypt(sub.password);

    sub.color = await this.colorSrv.findOne(sub.colorId);

    return sub;
  }

  async update(id: string, updateSubDto: UpdateSubDto, user: User) {
    const { password, ...detailsSub } = updateSubDto;

    const encryptedPassword = await this.encrypt(password);

    const sub = await this.subRepository.preload({
      id,
      password: encryptedPassword,
      ...detailsSub,
    });

    if (!sub) throw new NotFoundException(`sub con id:${id} no encontrado`);

    sub.user = user;

    sub.color = await this.colorSrv.findOne(sub.colorId);

    await this.subRepository.save(sub);

    delete sub.password;

    return sub;
  }

  async remove(id: string) {
    const sub = await this.findOne(id);

    await this.subRepository.remove(sub);

    sub.color = await this.colorSrv.findOne(sub.colorId);

    return sub;
  }

  //TODO: Arreglar
  async removeAllByUser(user: User) {
    const subs: Sub[] = await this.findAllByUser(user);

    for (const sub of subs) {
      // await this.subRepository.remove(sub.id);
    }

    return {
      statusCode: 204,
      message: 'Se eliminaron todas las subs del usuario',
    };
  }

  encrypt(data: string) {
    const encryptedData = CryptoJS.AES.encrypt(data, this.key).toString();
    return encryptedData;
  }

  decrypt(encryptedData: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  getRepo() {
    return this.subRepository;
  }
}
