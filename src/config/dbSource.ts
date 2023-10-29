import { DataSource } from "typeorm";
import { User } from "../entity/user";
import { Signin } from "../entity/signin";

export const DbSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root@123",
  database: "namdev",
  entities: [User, Signin],
  synchronize: true
});
