/**
 * ORM(Object Relational Mapping)
 * ORM Example: - Typeorm, Mongoose these two are best suited for nestJS,
 * Other ORM are: Prisma, Mikrorm, Sequelize
 * Module: typeorm
 * https://typeorm.io/
 *
 * https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md
 *
 * For One to one relation use - @OneToOne decorator and @JoinColumn to add reference to the table
 * where you add @JoinColumn id will be added to that table.
 * In @OneToOne use reference entity and cascade flag for auto CRED operations.
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
