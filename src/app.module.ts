import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultSubModule } from './default-sub/default-sub.module';
import { ColorModule } from './color/color.module';
import { CommonModule } from './common/common.module';
import { SubModule } from './sub/sub.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false, // Cuando creamos un cambio en nuestras entidades automaticamente las sincroniza
      //! En prod synchronize usualmente va en false, deberiamos usar una migración
    }),

    DefaultSubModule,

    ColorModule,
    CommonModule,
    SubModule,
    SeedModule,
    AuthModule,
  ],
})
export class AppModule {}
