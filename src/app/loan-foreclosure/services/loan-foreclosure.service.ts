import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoanForeclosureService {
    constructor(private http: HttpClient) {}

    getData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/getLoanData';
        return this.http.post<any>(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/closeLoan';
        return this.http.post<any>(url, data);
    }
}
