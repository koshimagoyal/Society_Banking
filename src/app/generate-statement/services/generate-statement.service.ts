import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GenerateStatementService {
    constructor(private http: HttpClient) {}

    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://206.189.129.219:8080/getOperationalAccountData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }

    getDialogData(data: any): Observable<any> {
        const url = 'http://206.189.129.219:8080/getAllUserData';
        return this.http.post<any>(url, data);
    }
}
