import { Module } from '@nestjs/common';
import { DefaultSubController } from './default-sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSub } from './entities/default-sub.entity';
import { DefaultSubService } from './default-sub.service';
import { ColorModule } from '../color/color.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DefaultSubController],
  providers: [DefaultSubService],
  imports: [TypeOrmModule.forFeature([DefaultSub]), ColorModule, AuthModule],
  exports: [TypeOrmModule, DefaultSubService],
})
export class DefaultSubModule {}
