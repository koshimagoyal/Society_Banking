import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private httpService: HttpClient) {}
    getData(text: any): Observable<any> {
        console.log(text);
        const url = 'http://drsunitanayak.com:8080/getUserData';
        const data = {
            userId: text,
        };
        return this.httpService.post<any>(url, data);
    }
    sendData(data: any): Observable<any> {
        console.log(data);
        const url = 'http://drsunitanayak.com:8080/updateUserData';
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, data, { headers });
    }
}
