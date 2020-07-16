import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoanEntryService {
    constructor(private http: HttpClient) {}

    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://localhost:8080/getUserData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }
    getCorpusData(): Observable<any> {
        const url = 'http://localhost:8080/getCorpusData';
        return this.http.get<any>(url);
    }
    getAllData(text: any): Observable<any> {
        const data = {
            userId: text,
        };
        const url = 'http://localhost:8080/getUserLoanData';
        return this.http.post(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendLoanEntry';
        return this.http.post<any>(url, data);
    }
}
