/**
 * ORM(Object Relational Mapping)
 * ORM Example: - Typeorm, Mongoose these two are best suited for nestJS,
 * Other ORM are: Prisma, Mikrorm, Sequelize
 * Module: typeorm
 * https://typeorm.io/
 *
 * https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExampleStatus } from './example.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ExampleStatus;
}
