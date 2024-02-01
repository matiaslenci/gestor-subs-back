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

@Injectable()
export class SubService {
  constructor(
    @InjectRepository(Sub)
    private readonly subRepository: Repository<Sub>,
    private colorSrv: ColorService,
  ) {}

  async create(createSubDto: CreateSubDto) {
    const colorFound = await this.colorSrv.findOne(createSubDto.colorId);

    if (!colorFound)
      throw new NotFoundException(
        `Color con id:${createSubDto.colorId} no encontrado`,
      );
    try {
      const sub = this.subRepository.create(createSubDto);
      await this.subRepository.save(sub);
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

  async findOne(term: string) {
    let sub: Sub;

    if (isUUID(term)) {
      sub = await this.subRepository.findOneBy({ id: term });
    }

    if (!sub) throw new NotFoundException(`sub ${term} no encontrado`);

    sub.color = await this.colorSrv.findOne(sub.colorId);

    return sub;
  }

  async update(id: string, updateSubDto: UpdateSubDto) {
    const sub = await this.subRepository.preload({
      id,
      ...updateSubDto,
    });

    if (!sub) throw new NotFoundException(`sub con id:${id} no encontrado`);

    await this.subRepository.save(sub);

    sub.color = await this.colorSrv.findOne(sub.colorId);

    return sub;
  }

  async remove(id: string) {
    const sub = await this.findOne(id);

    await this.subRepository.remove(sub);

    sub.color = await this.colorSrv.findOne(sub.colorId);

    return sub;
  }
}
