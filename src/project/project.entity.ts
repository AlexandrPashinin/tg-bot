import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ nullable: false })
  project_name: string;

  @Column({ type: 'json' })
  project_block: Record<string, any>;

  @Column()
  project_createTime: number;

  @Column()
  description: string;
}
