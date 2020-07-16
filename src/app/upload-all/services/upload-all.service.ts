import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UploadAllService {
    constructor(private httpService: HttpClient) {}
    getBankList(): Observable<any> {
        const url = 'http://drsunitanayak.com:8080/getBankList';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.get<any>(url, { headers });
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    sendBankData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/sendBankData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getLoanData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/loanData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCreditData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/creditData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getDebitData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/debitData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getExpenseData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/expenseData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCreditDebitExpenseData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/creditDebitExpenseData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCashData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/cashData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getChequeData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getData/chequeData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
}
