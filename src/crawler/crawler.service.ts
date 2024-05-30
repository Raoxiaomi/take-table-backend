import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Crawler } from './entities/crawler.entity';
import { Entity, Repository } from "typeorm";
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(Crawler) private crawlerRepository: Repository<Crawler>,
    private readonly httpService: HttpService,
  ) {}

  async getWhoList(pageNo: number = 0, pageCount: number = 10): Promise<any> {
    let res = null;
    await firstValueFrom(
      this.httpService.get('https://www.who.int/api/hubs/newsitems', {
        params: {
          sf_site: '15210d59-ad60-47ff-a542-7ed76645f0c7',
          sf_provider: 'OpenAccessDataProvider',
          sf_culture: 'zh',
          $orderby: 'PublicationDateAndTime desc',
          $select: 'Title,ItemDefaultUrl,FormatedDate,Tag,ThumbnailUrl',
          $format: 'json',
          $top: pageCount,
          $skip: pageCount * pageNo,
          count: true,
        },
        // headers: {
        //   'X-Requested-With': 'XMLHttpRequest',
        //   'User-Agent':
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        //   'Sec-Fetch-Site:': 'same-origin',
        //   'Sec-Fetch-Mode': 'cors',
        //   'Sec-Fetch-Dest': 'empty',
        //   'Sec-Ch-Ua-Platform': '"Windows"',
        //   'Sec-Ch-Ua-Mobile': '?0',
        //   'Sec-Ch-Ua':
        //     '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        // },
      }),
    ).then((res1) => {
      console.info(res1.data);
      res = res1.data?.value;
      // let crawler = null;
      for (const item of res) {
        const crawler = Object.assign(new Crawler(), item);
        this.getWhoItem(item?.ItemDefaultUrl).then((content) => {
          crawler.content = content;
          this.crawlerRepository.save(crawler);
        });
      }
    });
    return res;
  }

  async getWhoItem(item: string): Promise<any> {
    let res = '';
    console.info('爬取来源：https://www.who.int/zh/news/item/' + item);
    await firstValueFrom(
      this.httpService.get('https://www.who.int/zh/news/item/' + item),
    ).then((res1) => {
      const html = cheerio.load(res1.data);
      // res.title = html('h1').text();
      res = html('.sf-detail-body-wrapper').text();
    });
    return res;
  }
}
