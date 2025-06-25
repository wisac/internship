import { DataSource } from "typeorm";
import { User } from "../users/entity/User";
import { UserService } from "../users/service/user.service";

export class AuthController {
   private userService: UserService
   constructor(dataSource: DataSource) {
      this.userService = new UserService(dataSource);
   }

   public async login(email: string, password: string) {

      return this.userService.signIn(email, password);
   }

   public async register(data: Partial<User>) {
      return await this.userService.create(data);
   }


   
}