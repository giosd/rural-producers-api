import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersModule } from './producers/producers.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'rural',
      autoLoadEntities: true,
      synchronize: true, // apenas para desenvolvimento
    }),
    ProducersModule,
    DashboardModule,
  ],
})
export class AppModule {}
