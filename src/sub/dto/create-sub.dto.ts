import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Color } from '../../color/entities/color.entity';
import { Entity } from 'typeorm';

@Entity()
export class CreateSubDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  logo: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  expiration?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  colorId?: number;

  @IsString()
  @IsOptional()
  color?: Color;
}
