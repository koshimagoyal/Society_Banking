import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExpenseCorpusService {
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
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendDebitEntry';
        return this.http.post<any>(url, data);
    }
}
