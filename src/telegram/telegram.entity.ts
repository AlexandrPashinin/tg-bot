import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Telegram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
