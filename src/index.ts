// index.ts
import { config } from "dotenv";
import express from "express";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./database/data-source";
import { openSync } from "fs";
import rateLimit from "express-rate-limit";
import Joi from "joi";
import { json } from "stream/consumers";
import { AuthController } from "./auth/auth.controller";

// const router = express.Router();

// router.get("/users",(req: Request, res: Response, next: NextFunction) => {
//    const body = req.body;

//    const schema = Joi.object({
//       email: Joi.string().email().required(),
//    });

//    res.status(200).json("posting");

//    schema.validate(body);
// });

config({
   path: process.cwd() + "/.env",
});

const app = express();
const port = 4000;

app.use(
   express.json({
      limit: "300kb",
   })
);

app.use(
   "/api",
   rateLimit({
      max: 200,
      windowMs: 60 * 60 * 1000, // 1 hr,
      message: "Too many request from this IP. Please try again later.",
   })
);


 AppDataSource.initialize()
   .then((dataSource) => {
      console.log("Database initialised...");

      // Register
      app.post("/users", async (req: Request, res: Response) => {
          
         const body = req.body;

         const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6)
         });

         const validatedData = schema.validate(body);
         if (validatedData.error) {
             res.status(400).json({
               success: false,
               message: validatedData.error.message,
            });
         }

         const authController = new AuthController(dataSource);

         const user = await authController.register({
            email: validatedData.value.email,
            password: validatedData.value.password,
         });

         res.status(201).json(user);
   
      })
      



      // Sign in
      app.post("/auth/login", async (req: Request, res: Response, next: NextFunction) => {
         
           
         const body = req.body;

         const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6)
         });

         const validatedData = schema.validate(body);
         if (validatedData.error) {
             res.status(400).json({
               success: false,
               message: validatedData.error.message,
            });
         }

         const authController = new AuthController(dataSource);

         const data = await authController.login(
             validatedData.value.email,
           validatedData.value.password,
         );

         if (!data) {
            res.status(401).json("Invalid email or password");
         }

         res.status(200).json(data);
   
      })




      app.post("/events", (req: Request, res: Response, next: NextFunction) => {

            
         const body = req.body;

         const schema = Joi.object({
            title: Joi.string().email().required(),
            description: Joi.string(),
            date: Joi.date(),
            totalSeats: Joi.number()
         });

         const validatedData = schema.validate(body);
         if (validatedData.error) {
            res.status(400).json({
               success: false,
               message: validatedData.error.message,
            });
         }
         // got here

    

      })

      

      app.listen(port, () => {
         console.log(`Example app listening on port ${port}`);
      });
   })
   .catch((e) => console.log("Failed to initialise database", e));



