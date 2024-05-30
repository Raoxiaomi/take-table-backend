import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Prior {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  condition: string;

  @Column({
    type: 'text',
  })
  feature: string;

  @Column({
    type: 'varchar',
  })
  suggestion: string;
}
