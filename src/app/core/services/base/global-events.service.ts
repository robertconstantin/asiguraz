import {EventEmitter, Injectable} from '@angular/core';
import { User } from '../../models/user/user.model';

@Injectable()
export class GlobalEventsService {

    public currentUser: EventEmitter<User> = new EventEmitter();
    public showNavBar: EventEmitter<boolean> = new EventEmitter();
    public saveAsigurareAutoData: EventEmitter<string> = new EventEmitter();

    constructor() { }
}
