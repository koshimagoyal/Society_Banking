import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MiscellaneousService {
    constructor(private http: HttpClient) {}
    getBankList(): Observable<any> {
        const url = 'http://localhost:8080/getBankList';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.http.get<any>(url, { headers });
    }
    searchCheque(text: any): Observable<any> {
        console.log(text);
        const url = 'http://localhost:8080/searchCheque';
        const data = {
            chequeNo: text,
        };
        return this.http.post<any>(url, data);
    }
    transferCash(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/transferCash';
        return this.http.post<any>(url, data);
    }
    withdrawCash(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/withdrawCash';
        return this.http.post<any>(url, data);
    }
}
