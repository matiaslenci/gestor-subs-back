import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ColorController],
  providers: [ColorService],
  imports: [TypeOrmModule.forFeature([Color])],
})
export class ColorModule {}
