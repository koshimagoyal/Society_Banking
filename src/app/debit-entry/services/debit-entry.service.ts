import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DebitEntryService {
    constructor(private http: HttpClient) {}
    getBankList(): Observable<any> {
        const url = 'http://drsunitanayak.com:8080/getBankList';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.http.get<any>(url, { headers });
    }
    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://drsunitanayak.com:8080/getOperationalAccountData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }
    getCorpusData(): Observable<any> {
        const url = 'http://drsunitanayak.com:8080/getCorpusData';
        return this.http.get<any>(url);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/sendDebitEntry';
        return this.http.post<any>(url, data);
    }
}
