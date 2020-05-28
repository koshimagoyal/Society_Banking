import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddCorpusService {
    constructor(private http: HttpClient) {}
    getData(): Observable<any> {
        const url = 'http://localhost:8080/getCorpusData';
        return this.http.get<any>(url);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://localhost:8080/sendCorpusCredit';
        return this.http.post<any>(url, data);
    }
}
