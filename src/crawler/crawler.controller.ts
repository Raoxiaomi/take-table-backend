import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('/getWhoList')
  async getWhoList(
    @Query('pageNo') pageNo: number,
    @Query('pageCount') pageCount: number,
  ): Promise<any> {
    return this.crawlerService.getWhoList(pageNo, pageCount);
  }

  @Get('/getWhoItem')
  async getWhoItem(@Query('item') item: string): Promise<any> {
    return this.crawlerService.getWhoItem(item);
  }
}
