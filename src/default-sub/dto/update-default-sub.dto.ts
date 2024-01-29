import { PartialType } from '@nestjs/mapped-types';
import { CreateDefaultSubDto } from './create-default-sub.dto';

export class UpdateDefaultSubDto extends PartialType(CreateDefaultSubDto) {}
