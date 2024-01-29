import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubService } from './sub.service';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';

@Controller('sub')
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  create(@Body() createSubDto: CreateSubDto) {
    return this.subService.create(createSubDto);
  }

  @Get()
  findAll() {
    return this.subService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubDto: UpdateSubDto) {
    return this.subService.update(+id, updateSubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subService.remove(+id);
  }
}
