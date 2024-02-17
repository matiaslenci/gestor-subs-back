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
import { CreateDefaultSubDto } from './dto/create-default-sub.dto';
import { UpdateDefaultSubDto } from './dto/update-default-sub.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DefaultSubService } from './default-sub.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from './../auth/interfaces/valid-roles';

@Controller('default-sub')
export class DefaultSubController {
  constructor(private readonly defaultSubService: DefaultSubService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createDefaultSubDto: CreateDefaultSubDto) {
    return this.defaultSubService.create(createDefaultSubDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.defaultSubService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.defaultSubService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateDefaultSubDto: UpdateDefaultSubDto,
  ) {
    return this.defaultSubService.update(id, UpdateDefaultSubDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.defaultSubService.remove(id);
  }
}
