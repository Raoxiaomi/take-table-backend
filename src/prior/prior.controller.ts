// prior.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PriorService } from './prior.service';
import { Prior } from './entities/prior.entity';

@Controller('prior')
export class PriorController {
  constructor(private priorService: PriorService) {}

  @Post()
  async create(@Body() prior: Prior): Promise<Prior> {
    return this.priorService.create(prior);
  }
}
