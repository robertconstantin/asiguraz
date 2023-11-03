import { User } from './user.model';

export class UserUpdate {
    user_id: number;
    phone: string;
    first_name: string;
    last_name: string;
    two_step_auth: boolean;
    profile_picture: string;

  public constructor(userObject: User) {
    this.user_id = userObject.user_id;
    this.phone = userObject.phone;
    this.first_name = userObject.first_name;
    this.last_name = userObject.last_name;
    this.two_step_auth = false;
    this.profile_picture = userObject.profile_picture;
  }

}
