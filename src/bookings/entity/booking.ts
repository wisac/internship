import { UUID } from "crypto";
import {
   Entity,
   PrimaryGeneratedColumn,
   Column,

   ManyToOne,
   CreateDateColumn,
} from "typeorm";
import { User } from "../../users/entity/User";
import { Event } from "../../events/entity/event";

@Entity()
export class Booking {
   @PrimaryGeneratedColumn("uuid")
   id: UUID;

   @ManyToOne((user) => User)
   user: User;

   @ManyToOne((event) => Event)
   event: Event;

   @Column()
   date: Date;

   @Column()
   seats: number;

   @CreateDateColumn()
   createdAt: Date;
}

// id: UUID (PK)
// user: ManyToOne → User
// event: ManyToOne → Event
// seats: number
// createdAt: timestamp
