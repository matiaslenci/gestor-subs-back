import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DefaultSubModule } from '../default-sub/default-sub.module';
import { ColorModule } from '../color/color.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DefaultSubModule, ColorModule],
})
export class SeedModule {}
