/**
 * ORM(Object Relational Mapping)
 * ORM Example: - Typeorm, Mongoose these two are best suited for nestJS,
 * Other ORM are: Prisma, Mikrorm, Sequelize
 * Module: typeorm
 * https://typeorm.io/
 *
 * https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExampleStatus } from './example.model';
import { NestedDetailDTO } from './dto/nestedDetail.dto';

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ExampleStatus,
    nullable: false,
    default: ExampleStatus.OPEN,
  })
  status: ExampleStatus;

  @Column({
    type: 'json',
    nullable: true,
  })
  nestedDetail: NestedDetailDTO[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
