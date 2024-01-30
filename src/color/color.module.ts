import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSubModule } from '../default-sub/default-sub.module';
import { DefaultSub } from '../default-sub/entities/default-sub.entity';

@Module({
  controllers: [ColorController],
  providers: [ColorService],
  imports: [TypeOrmModule.forFeature([Color])],
  exports: [TypeOrmModule, ColorService],
})
export class ColorModule {}
