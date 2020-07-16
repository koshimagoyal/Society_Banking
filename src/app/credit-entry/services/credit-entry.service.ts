import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreditEntryService {
    constructor(private http: HttpClient) {}

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
        const url = 'http://drsunitanayak.com:8080/sendCreditEntry';
        return this.http.post<any>(url, data);
    }
}
