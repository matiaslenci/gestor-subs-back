import { Injectable } from '@nestjs/common';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';
import { DefaultSub } from './entities/default-sub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '../utils/handleDBException';

@Injectable()
export class DefaultSubService {
  constructor(
    @InjectRepository(DefaultSub)
    private readonly defaultSubRepository: Repository<DefaultSub>,
  ) {}
  async create(createDefaultSubDto: CreateDefaultSubDto) {
    try {
      const defaultSub = this.defaultSubRepository.create(createDefaultSubDto);

      await this.defaultSubRepository.save(defaultSub);
      return defaultSub;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all defaultSub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defaultSub`;
  }

  update(id: number, updateDefaultSubDto: UpdateDefaultSubDto) {
    return `This action updates a #${id} defaultSub`;
  }

  remove(id: number) {
    return `This action removes a #${id} defaultSub`;
  }
}
