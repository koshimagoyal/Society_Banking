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
            const passw = pass.slice(0, 3) + data[j][1].slice(0, 2) + pass.slice(3);
            user.push([data[j][0], data[j][1], passw, false, 2]);
            account.push([ddate, data[j][2], data[j][0]]);
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
        return this.httpService.post<any>(url, send, { headers });
    }

    sendLoanData(getData: any): Observable<any> {
        const data = getData.data;
        const ddate = getData.date;
        const url = 'http://localhost:8080/sendLoanData';
        const loan = [];
        const loanBook = [];
        for (let j = 1; j < data.length; j++) {
            let type;
            if (data[j][3] === 'Personal' || data[j][3] === 'personal') {
                type = 1;
            } else {
                type = 2;
            }
            loan.push([ddate, data[j][0], data[j][1], data[j][2], false, type]);
            loanBook.push([ddate, data[j][4]]);
        }
        const send = {
            loanData: loan,
            loanBookData: loanBook,
            date: ddate,
        };
        console.log(send);
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, send, { headers });
    }

    sendEliData(getData: any): Observable<any> {
        const data = getData.data;
        const eli = [];
        const url = 'http://localhost:8080/sendEligibleData';
        for (let j = 1; j < data.length; j++) {
            eli.push([data[j][0], data[j][1], data[j][2]]);
        }
        const send = {
            data: eli,
        };
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, send, { headers });
    }

    uploadFile(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'multipart/form-data');
        console.log(data);
        const url = 'http://localhost:8080/sendExcel';
        return this.httpService.post<any>(url, data, { headers });
    }

    getData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://localhost:8080/monthYear';
        return this.httpService.get(url, { headers });
    }

}
