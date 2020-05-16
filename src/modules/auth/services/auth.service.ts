import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
    constructor() {}

    getLoginAuth$(userId: any, password: any): Observable<any> {
        if (userId === 1234 && password === '1234') {
            const user = {
                id: '1234',
                firstName: 'XYZ',
                lastName: 'PXG',
                companyName: 'ABC',
                email: 'xyz@abc.com',
                type: 'employee',
            };
            return of(user);
        } else if (userId === 3456 && password === '3456') {
            const user = {
                id: '3456',
                firstName: 'KGH',
                lastName: 'YXG',
                companyName: 'ABC',
                email: 'kgh@abc.com',
                type: 'accountant',
            };
            return of(user);
        } else {
            return of('error');
        }
    }
}
