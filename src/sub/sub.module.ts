import { Module } from '@nestjs/common';
import { SubService } from './sub.service';
import { SubController } from './sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub } from './entities/sub.entity';
import { ColorModule } from '../color/color.module';

@Module({
  controllers: [SubController],
  providers: [SubService],
  imports: [TypeOrmModule.forFeature([Sub]), ColorModule],
  exports: [TypeOrmModule],
})
export class SubModule {}
