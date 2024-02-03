import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ColorController],
  providers: [ColorService],
  imports: [TypeOrmModule.forFeature([Color]), AuthModule],
  exports: [TypeOrmModule, ColorService],
})
export class ColorModule {}
