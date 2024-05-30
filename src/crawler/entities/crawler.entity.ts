import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crawler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column({
    type: 'varchar',
    comment: 'item链接后缀',
    name: 'item_link',
  })
  ItemDefaultUrl: string;

  @Column({
    type: 'varchar',
    comment: '封面图',
    name: 'thumbnail_url',
  })
  ThumbnailUrl: string;

  @Column({
    type: 'varchar',
    comment: '标签',
    name: 'tag',
  })
  Tag: string;

  @Column({
    type: 'varchar',
    comment: '发布时间',
    name: 'publish_time',
  })
  FormatedDate: string;

  @Column({
    type: 'text',
    comment: '新闻内容',
    name: 'content',
  })
  content: string;
}
