import { config } from "dotenv";
import "reflect-metadata";

import { Event } from "../events/entity/event";
import { DataSource } from "typeorm";
import { User } from "../users/entity/User";
import { Booking } from "../bookings/entity/booking";
config({
   path: process.cwd() + '/.env'
});

export const AppDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT, 10),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   synchronize: true,
   logging: false,
   
   
   // entities: [process.env + '/src/**//entity/*.entity.{js,ts}'],



   // '/../../modules/**/entities/central/*.entity{.ts,.js}


    entities: [
      User,Event, Booking
   ],
   


   
   // migrations: [],
   // subscribers: [],
});
