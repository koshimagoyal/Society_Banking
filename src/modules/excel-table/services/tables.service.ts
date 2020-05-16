import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable()
export class TablesService {
    constructor() {}

    getTables$(): Observable<{}> {
        return of({});
    }
}
