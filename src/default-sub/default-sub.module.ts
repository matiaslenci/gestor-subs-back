import { Module } from '@nestjs/common';
import { DefaultSubController } from './default-sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSub } from './entities/default-sub.entity';
import { DefaultSubService } from './default-sub.service';
import { Color } from '../color/entities/color.entity';

@Module({
  controllers: [DefaultSubController],
  providers: [DefaultSubService],
  imports: [TypeOrmModule.forFeature([DefaultSub, Color])],
})
export class DefaultSubModule {}
