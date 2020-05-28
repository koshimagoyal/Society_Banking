import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExpenseCorpusService {
    constructor(private http: HttpClient) {}
    getData(): Observable<any> {
        const url = 'http://localhost:8080/getCorpusData';
        return this.http.get<any>(url);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendCorpusDebit';
        return this.http.post<any>(url, data);
    }
}
