import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { handleDBExceptions } from '../common/utils/handleDBException';

@Injectable()
export class ColorService {
  //Para los logs de error
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(createColorDto: CreateColorDto) {
    try {
      const color = this.colorRepository.create(createColorDto);
      await this.colorRepository.save(color);

      return color;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  findAll() {
    return this.colorRepository.find();
  }

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id });

    if (!color) throw new NotFoundException(`Color con el ${id} no encontrado`);

    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    const color = await this.colorRepository.preload({
      id: id,
      ...updateColorDto,
    });

    if (!color) throw new NotFoundException(`Color con id:${id} no encontrado`);

    try {
      await this.colorRepository.save(color);
      return color;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const color = await this.findOne(id);

    await this.colorRepository.remove(color);

    return color;
  }

  async deleteAllColors() {
    const query = this.colorRepository.createQueryBuilder();

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async reinicirSecuenciaId() {
    const query = `
    SELECT setval(
      pg_get_serial_sequence('color', 'id'),
      COALESCE(MAX(id), 1),
      false
    )
    FROM color;
  `;
    await this.entityManager.query(query);
  }

  getRepo() {
    return this.colorRepository;
  }
}
