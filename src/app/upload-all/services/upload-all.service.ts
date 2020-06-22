import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UploadAllService {
    constructor(private httpService: HttpClient) {}
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getLoanData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCreditData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getDebitData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getExpenseData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCreditDebitExpenseData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getCashData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
    getChequeData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/createUserAccount';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
}
