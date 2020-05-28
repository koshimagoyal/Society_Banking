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
        const url = 'http://localhost:8080/getAccountData';
        const data = {
            userId: text,
        }
        return this.http.post<any>(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendCredit';
        return this.http.post<any>(url, data);
    }
}
