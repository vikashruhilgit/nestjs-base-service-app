import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileType } from './enums/file-type.enum';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '1024',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: FileType,
    default: FileType.IMAGE,
    nullable: false,
  })
  type: FileType;

  @Column({
    type: 'varchar',
    length: '128',
    nullable: false,
  })
  mime: string;

  @Column({
    type: 'varchar',
    length: '128',
    nullable: false,
  })
  size: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
