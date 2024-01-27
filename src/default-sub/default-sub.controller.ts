import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { DefaultSubService } from './default-sub.service';
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('default-sub')
export class DefaultSubController {
  constructor(private readonly defaultSubService: DefaultSubService) {}

  @Post()
  create(@Body() createDefaultSubDto: CreateDefaultSubDto) {
    return this.defaultSubService.create(createDefaultSubDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.defaultSubService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.defaultSubService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDefaultSubDto: UpdateDefaultSubDto,
  ) {
    return this.defaultSubService.update(+id, updateDefaultSubDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.defaultSubService.remove(id);
  }
}
