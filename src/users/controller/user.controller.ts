import { UUID } from "crypto";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";

export class UserController {
   private userService: UserService
   constructor(userService: UserService) {
      this.userService = userService
   }
   public getAll() {
      return this.userService.getAll()
   }

   public getOne(id: UUID) {
      const user = this.userService.getOne(id);
   }


}