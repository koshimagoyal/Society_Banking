import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private httpService: HttpClient) {}

    getData(text: any): Observable<any> {
        const data = {
            userId: text,
        };
        const url = 'http://localhost:8080/get/userData';
        return this.httpService.post(url, data);
    }
}
