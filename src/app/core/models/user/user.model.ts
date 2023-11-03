import { Role } from './role.model';

export class User {
    user_id: number;
    role_id: number;
    email: string;
    phone: string;
    default_language: string;
    two_step_login: boolean;
    has_valid_email: boolean;
    // user details
    first_name: string;
    middle_name: string;
    last_name: string;
    full_name: string;
    profile_picture: string;

    role: Role;
}
