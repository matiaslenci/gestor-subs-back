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
import { SubService } from './sub.service';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('sub')
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  create(@Body() createSubDto: CreateSubDto) {
    return this.subService.create(createSubDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.subService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.subService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubDto: UpdateSubDto,
  ) {
    return this.subService.update(id, updateSubDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subService.remove(id);
  }
}
