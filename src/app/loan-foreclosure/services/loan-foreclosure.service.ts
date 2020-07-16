import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoanForeclosureService {
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
    getData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/getLoanData';
        return this.http.post<any>(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/sendLoanForeCloseData';
        const closeData = {
            closeData: data,
        };
        return this.http.post<any>(url, closeData);
    }
}
