import { User } from './user.model';

export class AppSession {
    session_token: string;
    two_step_code: string;
    validation_code: string;
    user: User;
}
