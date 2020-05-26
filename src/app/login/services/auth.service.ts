import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private httpService: HttpClient) {}

    errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
        }
        window.alert('Error Code: ' + error.status + '\nLogin Unsuccessfull');
        return throwError(errorMessage);
    }

    getLoginAuth$(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        console.log(data);
        const url = 'http://localhost:8080/login';
        return this.httpService
            .post<any>(url, data, { headers })
            .pipe(catchError(this.errorHandler));
    }
}
