import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable()
export class DashboardService {
    constructor() {}

    getDashboard$(): Observable<{}> {
        return of({});
    }
}
