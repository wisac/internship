import { UUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Event {
   @PrimaryGeneratedColumn("uuid")
   id: UUID;

   @Column({
      unique: true,
   })
   title: string;

   @Column()
   description: string;

   @Column()
   date: Date

   @Column()
   totalSeats: number

   @Column()
   bookedSeats: number
}



// id: UUID (PK)
// title: string
// description: string
// date: timestamp
// totalSeats: number
// bookedSeats: number (or derive from bookings)
