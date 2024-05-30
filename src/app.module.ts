import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorModule } from './prior/prior.module';
import { Prior } from './prior/entities/prior.entity';
import { CrawlerModule } from './crawler/crawler.module';
import { Crawler } from './crawler/entities/crawler.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'yrk_test',
      entities: [Prior, Crawler],
      synchronize: true,
    }),
    PriorModule,
    CrawlerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
