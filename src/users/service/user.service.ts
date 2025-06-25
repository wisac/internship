import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { User } from "../entity/User";
import { UUID } from "crypto";

import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { emit } from "process";

export class UserService {
   private dataSource: DataSource;
   private repo: Repository<User>;
   constructor(datasource: DataSource) {
      this.dataSource = datasource;
      this.repo = datasource.getRepository(User);
   }
   public async getAll() {
      const users = await this.repo.find();

      return users;
   }

   public async getOne(id: UUID) {
      return this.repo.findOne({
         where: {
            id,
         },
      });
   }

   public async create(data: Partial<User>) {
      const user = this.repo.create(data);

      user.password = await this.hashPassword(data.password);

      console.log(user)

      return this.repo.save(user);
      // return this.getOne(user.id)
   }

   private async hashPassword(plainPassword: string) {
      return bcrypt.hash(plainPassword, 12);
   }

    async signIn(email: string, password: string) {
      const user = await this.repo.findOne({
         where: { email },
         select: ['id','email','password']
      },);

      if (!user) {
         return null;
      }

      const isValidated = bcrypt.compare(password, user.password);

      if ( !isValidated) {
         return null;
      }

      const token = this.signToken(user);

      user.password = undefined

      return { user, token };
   }

   private signToken(payload: Partial<User>) {
      const secret = process.env.JWT_SECRET;

      return jwt.sign(
         {
            id: payload.id,
            email: payload.email,
         },
         secret
      );
   }

}
