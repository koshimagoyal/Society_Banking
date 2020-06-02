import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GenerateStatementService {
    constructor(private http: HttpClient) {}

    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://localhost:8080/getAccountData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }

    getDialogData(data: any): Observable<any> {
        const url = 'http://localhost:8080/getAllUserData';
        return this.http.post<any>(url, data);
    }
}
