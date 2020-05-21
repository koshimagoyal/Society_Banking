import { Injectable } from '@angular/core';
import { User } from '@app/app-common/models';
import { Observable, ReplaySubject } from 'rxjs';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor() {}

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
