import { Module } from '@nestjs/common';
import { DefaultSubService } from './default-sub.service';
import { DefaultSubController } from './default-sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSub } from './entities/default-sub.entity';

@Module({
  controllers: [DefaultSubController],
  providers: [DefaultSubService],
  imports: [TypeOrmModule.forFeature([DefaultSub])],
})
export class DefaultSubModule {}
