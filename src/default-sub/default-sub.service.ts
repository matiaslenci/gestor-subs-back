import { Injectable } from '@nestjs/common';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';

@Injectable()
export class DefaultSubService {
  create(createDefaultSubDto: CreateDefaultSubDto) {
    return 'This action adds a new defaultSub';
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
