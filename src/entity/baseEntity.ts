import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity()
export class BaseEntity {
  @Column()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;
  
  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;
}
