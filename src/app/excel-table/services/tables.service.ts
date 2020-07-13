import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TablesService {
    constructor(private httpService: HttpClient) {}

    sendData(getData: any): Observable<any> {
        console.log(getData);
        const data = getData.data;
        const ddate = getData.date;
        const url = 'http://206.189.129.219:8080/sendDepositData';
        const account = [];
        for (let j = 1; j < data.length; j++) {
            account.push([
                ddate,
                data[j][0],
                data[j][1],
                'Deposit deducted from salary of ' + ddate,
                'Cash',
                'Operational',
            ]);
        }
        const send = {
            accountData: account,
        };
        console.log(send);
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, send, { headers });
    }

    sendLoanData(getData: any): Observable<any> {
        const data = getData.data;
        const ddate = getData.date;
        const url = 'http://206.189.129.219:8080/sendLoanData';
        const loan = [];
        const loanBook = [];
        for (let j = 1; j < data.length; j++) {
            loan.push([data[j][0], data[j][1], data[j][2], data[j][3]]);
            loanBook.push([
                ddate,
                data[j][4],
                'EMI debited from Salary of ' + ddate,
                'Cash',
                'EMI',
            ]);
        }
        const send = {
            loanData: loan,
            loanBookData: loanBook,
        };
        console.log(send);
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        return this.httpService.post<any>(url, send, { headers });
    }

    uploadFile(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'multipart/form-data');
        console.log(data);
        const url = 'http://206.189.129.219:8080/sendExcel';
        return this.httpService.post<any>(url, data, { headers });
    }

    getData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://206.189.129.219:8080/monthYear';
        return this.httpService.get(url, { headers });
    }

    getEmiData(): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://206.189.129.219:8080/getLoanEmiData';
        return this.httpService.get(url, { headers });
    }

    closeLoan(data: any): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        const url = 'http://206.189.129.219:8080/sendLoanAutoCloseData';
        const closeData = {
            closeData: data,
        };
        return this.httpService.post(url, closeData, { headers });
    }
}
