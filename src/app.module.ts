import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersModule } from './producers/producers.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'rural',
      autoLoadEntities: true,
      synchronize: true, // apenas para desenvolvimento
    }),
    ProducersModule,
    DashboardModule,
  ],
})
export class AppModule {}
