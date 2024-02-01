import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';
import { DefaultSub } from './entities/default-sub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '../common/utils/handleDBException';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { ColorService } from '../color/color.service';

@Injectable()
export class DefaultSubService {
  constructor(
    @InjectRepository(DefaultSub)
    private readonly defaultSubRepository: Repository<DefaultSub>,
    private colorSrv: ColorService,
  ) {}
  async create(createDefaultSubDto: CreateDefaultSubDto) {
    const colorFound = await this.colorSrv.findOne(createDefaultSubDto.colorId);

    if (!colorFound)
      throw new NotFoundException(
        `Color con id:${createDefaultSubDto.colorId} no encontrado`,
      );
    try {
      const newDefaultSub =
        this.defaultSubRepository.create(createDefaultSubDto);
      await this.defaultSubRepository.save(newDefaultSub);
      return { newDefaultSub, ...newDefaultSub.color };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.defaultSubRepository.find({
      take: limit,
      skip: offset,
      relations: ['color'],
    });
  }

  async findOne(term: string) {
    let defaultSub: DefaultSub;

    if (isUUID(term)) {
      defaultSub = await this.defaultSubRepository.findOneBy({ id: term });
    } else {
      const query = this.defaultSubRepository.createQueryBuilder();
      defaultSub = await query
        .where('UPPER(name) =:name or slug =:slug', {
          name: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .getOne();

      // Es como:`select * from DefaultSub where slug='XX' or name='xxxx'`
      // Esto evita injeccion SQL escapando caracteres
      // Este Query Builder permite escribir tus propias consultas
    }

    if (!defaultSub)
      throw new NotFoundException(`defaultSub ${term} no encontrado`);

    defaultSub.color = await this.colorSrv.findOne(defaultSub.colorId);

    return defaultSub;
  }

  async update(id: string, updateDefaultSubDto: UpdateDefaultSubDto) {
    const defaultSub = await this.defaultSubRepository.preload({
      id,
      ...updateDefaultSubDto,
    });

    if (!defaultSub)
      throw new NotFoundException(`defaultSub con id:${id} no encontrado`);

    await this.defaultSubRepository.save(defaultSub);

    defaultSub.color = await this.colorSrv.findOne(defaultSub.colorId);

    return defaultSub;
  }

  async remove(id: string) {
    const defaultSub = await this.findOne(id);

    await this.defaultSubRepository.remove(defaultSub);

    defaultSub.color = await this.colorSrv.findOne(defaultSub.colorId);

    return defaultSub;
  }

  /**
   * Elimina todos los defaultSubs de la base de datos
   * ! No usar en productivo
   */
  async deleteAllDefaultSubs() {
    const query = this.defaultSubRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBExceptions(error);
    }

    return 'DefaultSubs eliminados';
  }
}
