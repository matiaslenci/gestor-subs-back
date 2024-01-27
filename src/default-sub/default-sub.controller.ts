import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefaultSubService } from './default-sub.service';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';

@Controller('default-sub')
export class DefaultSubController {
  constructor(private readonly defaultSubService: DefaultSubService) {}

  @Post()
  create(@Body() createDefaultSubDto: CreateDefaultSubDto) {
    return this.defaultSubService.create(createDefaultSubDto);
  }

  @Get()
  findAll() {
    return this.defaultSubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defaultSubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefaultSubDto: UpdateDefaultSubDto) {
    return this.defaultSubService.update(+id, updateDefaultSubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defaultSubService.remove(+id);
  }
}
