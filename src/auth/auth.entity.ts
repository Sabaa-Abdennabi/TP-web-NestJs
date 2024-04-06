import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn,PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity()
export class Users extends BaseEntity{


@PrimaryGeneratedColumn()
    id: number;

@Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column() 
  salt:string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;

}
}