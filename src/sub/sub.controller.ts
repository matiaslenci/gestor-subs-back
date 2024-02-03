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
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';

@Controller('sub')
@Auth()
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  create(@Body() createSubDto: CreateSubDto, @GetUser() user: User) {
    return this.subService.create(createSubDto, user);
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
    @GetUser() user: User,
  ) {
    return this.subService.update(id, updateSubDto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subService.remove(id);
  }
}
