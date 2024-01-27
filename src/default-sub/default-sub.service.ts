import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';
import { DefaultSub } from './entities/default-sub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '../common/utils/handleDBException';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.defaultSubRepository.find({
      take: limit,
      skip: offset,
    });
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
