import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
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
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  expiration?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
