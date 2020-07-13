import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CloseAccountService {
    constructor(private http: HttpClient) {}

    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://206.189.129.219:8080/getCloseData';
        const data = {
            userId: text,
        };
        return this.http.post<any>(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://206.189.129.219:8080/closeAccount';
        return this.http.post<any>(url, data);
    }
}
