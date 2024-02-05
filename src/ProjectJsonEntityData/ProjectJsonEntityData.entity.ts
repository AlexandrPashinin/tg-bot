import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectJsonEntityData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  key: string;

  @Column('text', { nullable: true })
  jsonData: Record<string, any>;
}
