import { Cv } from "src/cv/entities/cv.entity";
import { User } from "src/user/entities/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CvHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => User, user => user.cvHistories, {eager : true}) // Define many-to-one relationship
  actionBy: User;

  @ManyToOne(()=>Cv, cv => cv.histories, {eager : true})
  cv : Cv;
  

  @Column()
  date: Date;
}
