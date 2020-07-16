import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplyLoanService {
    constructor(private http: HttpClient) {}
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/sendLoanEntry';
        return this.http.post<any>(url, data);
    }
}
