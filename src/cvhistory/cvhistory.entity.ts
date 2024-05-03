import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CvHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  actionBy: string;

  @Column()
  date: Date;
}
