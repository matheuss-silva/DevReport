// src/models/Relatorio.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Relatorio {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  nome: string | undefined;

  @Column()
  email: string | undefined;
}
