import { Injectable, NotFoundException } from '@nestjs/common';
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

  //TODO: paginar
  findAll() {
    return this.defaultSubRepository.find();
  }

  async findOne(id: string) {
    const defaultSub = await this.defaultSubRepository.findOneBy({ id });

    if (!defaultSub)
      throw new NotFoundException(`defaultSub con el ${id} no encontrado`);

    return defaultSub;
  }

  update(id: number, updateDefaultSubDto: UpdateDefaultSubDto) {
    return `This action updates a #${id} defaultSub`;
  }

  async remove(id: string) {
    const defaultSub = await this.findOne(id);

    await this.defaultSubRepository.remove(defaultSub);

    return defaultSub;
  }
}
