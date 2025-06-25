import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
   @PrimaryGeneratedColumn("uuid")
   id: UUID;

   @Column({
      unique: true,
   })
   email: string;

   @Column({
      select: false
   })
   password: string;
}
