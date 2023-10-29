import { Entity, Column, OneToOne, Unique } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./user";

@Entity()
export class Signin extends BaseEntity {
  @Column()
  @Unique("username",['username'])
  username!: string;

  @Column()
  password!: string;

  @OneToOne(() => User)
  user!: User;
}
