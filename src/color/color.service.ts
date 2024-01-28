import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDBExceptions } from '../common/utils/handleDBException';

@Injectable()
export class ColorService {
  //Para los logs de error
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
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

  async findOne(id: string) {
    const color = await this.colorRepository.findOneBy({ id });

    if (!color) throw new NotFoundException(`Color con el ${id} no encontrado`);

    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
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

  async remove(id: string) {
    const color = await this.findOne(id);

    await this.colorRepository.remove(color);

    return color;
  }
}
