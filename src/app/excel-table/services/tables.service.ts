import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TablesService {
    constructor(private httpService: HttpClient) {}

    sendData(getData: any): Observable<any> {
        console.log(getData);
        const data = getData.data;
        const ddate = getData.date;
        const url = 'http://localhost:8080/sendData';
        const user = [];
        const account = [];
        for (let j = 1; j < data.length; j++) {
            let pass = '';
            const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
            for (let i = 1; i <= 8; i++) {
                const char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }
            const passw = pass.slice(0, 3) + data[j][1] + pass.slice(3);
            user.push([data[j][0], data[j][1], passw, 2]);
            account.push([ddate, data[j][2], false, data[j][0]]);
        }
        const send = {
            userData: user,
            accountData: account,
        };
        console.log(send);
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService
            .post<any>(url, send, { headers })
            .pipe(catchError(this.errorHandler));
    }

    sendLoanData(getData: any): Observable<any> {
        const data = getData.data;
        const ddate = getData.date;
        const url = 'http://localhost:8080/sendLoanData';
        const user = [];
        const account = [];
        for (let j = 1; j < data.length; j++) {
            let pass = '';
            const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
            for (let i = 1; i <= 8; i++) {
                const char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }
            const passw = pass.slice(0, 3) + data[j][1] + pass.slice(3);
            user.push([data[j][0], data[j][1], passw, 2]);
            account.push([ddate, data[j][2], false, data[j][0]]);
        }
        const send = {
            userData: user,
            accountData: account,
        };
        console.log(send);
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, send,{headers}).pipe(catchError(this.errorHandler));
    }

    uploadFile(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'multipart/form-data');
        console.log(data);
        const url = 'http://localhost:8080/sendExcel';
        return this.httpService
            .post<any>(url, data, { headers })
            .pipe(catchError(this.errorHandler));
    }

    getData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://localhost:8080/monthYear';
        return this.httpService.get(url, { headers }).pipe(catchError(this.errorHandler));
    }

    errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage : ${error.message}`;
        }
        window.alert('Error Code: ' + error.status + '\nSheet Error');
        return throwError(errorMessage);
    }
}
