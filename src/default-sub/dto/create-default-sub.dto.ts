import { IsOptional, IsString, MinLength } from 'class-validator';

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
}
