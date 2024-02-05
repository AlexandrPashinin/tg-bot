import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TelegramEvent {
  @PrimaryGeneratedColumn()
  block_id: number;

  @Column()
  block_createTime: Date;

  @Column({ type: 'json' })
  telegram_data: Record<string, any>;

  @Column()
  type_event: string;
}
