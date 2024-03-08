// src/models/Relatorio.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Relatorio {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  email?: string;
}
