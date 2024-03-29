import { BoardStatusValue } from './board.model';
import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatusValue;
}
