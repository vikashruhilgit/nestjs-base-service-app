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
 * In @OneToOne use reference entity
 * "cascade" flag will create reference table record with parent.
 * "eager" flag will read reference table record with parent.
 *
 * or with repository service find method by using 'relations'
 *
 * Learn more about uni directional and by directional relation.
 */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from './user.model';
import { Address } from '../address/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.IN_ACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[];
}
