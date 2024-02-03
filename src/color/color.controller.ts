import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
