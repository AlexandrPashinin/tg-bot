import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  user_log: string;

  @Column({ nullable: true })
  user_text: string;
}
