import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExpenseCorpusService {
    constructor(private http: HttpClient) {}
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendDebitEntry';
        return this.http.post<any>(url, data);
    }
}
