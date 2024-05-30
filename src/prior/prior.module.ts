import { Module } from '@nestjs/common';
import { PriorService } from './prior.service';
import { PriorController } from './prior.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prior } from './entities/prior.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prior])],
  controllers: [PriorController],
  providers: [PriorService],
})
export class PriorModule {}
