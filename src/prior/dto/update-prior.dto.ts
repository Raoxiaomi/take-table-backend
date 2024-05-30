import { PartialType } from '@nestjs/mapped-types';
import { CreatePriorDto } from './create-prior.dto';

export class UpdatePriorDto extends PartialType(CreatePriorDto) {}
