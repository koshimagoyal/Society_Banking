import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoanEligibleService {
    constructor(private http: HttpClient) {}

    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://drsunitanayak.com:8080/getEligibleData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }
}
