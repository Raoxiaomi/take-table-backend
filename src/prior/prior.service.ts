// prior.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prior } from './entities/prior.entity';

@Injectable()
export class PriorService {
  constructor(
    @InjectRepository(Prior)
    private priorRepository: Repository<Prior>,
  ) {}

  async create(prior: Prior): Promise<Prior> {
    return this.priorRepository.save(prior);
  }
}
