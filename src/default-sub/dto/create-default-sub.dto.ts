import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Color } from '../../color/entities/color.entity';

export class CreateDefaultSubDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  logo?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  slug?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  colorId?: number;

  @IsString()
  @IsOptional()
  color?: Color;
}
