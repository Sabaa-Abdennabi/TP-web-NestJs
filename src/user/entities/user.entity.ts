import { CvHistory } from 'src/cvhistory/cvhistory.entity';
import { Cv } from '../../cv/entities/cv.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'utilisateurs' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];

  @OneToMany(() => CvHistory, (cvh) => cvh.actionBy)
  cvHistories : CvHistory[]
}
