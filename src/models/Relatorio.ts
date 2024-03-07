// src/models/Relatorio.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Relatorio {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  nome: string = '';

  // Outros campos conforme necessário
}
