import { Entity, Column, Unique } from "typeorm";
import { Signin } from "./signin";
import { BaseEntity } from "./baseEntity";

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  @Unique("email", ["email"])
  email!: string;
}
