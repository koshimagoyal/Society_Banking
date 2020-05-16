import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    countries = [
        {
            id: 1,
            date: '12-02-2018',
            particulars: 'abc',
            withdrawal: 2000,
            deposit: 9754,
            balance: 1237894,
        },
        {
            id: 2,
            date: '06-04-2018',
            particulars: 'hgvhg',
            withdrawal: 2560,
            deposit: 974,
            balance: 1237894,
        },
        {
            id: 3,
            date: '23-04-2018',
            particulars: 'hgjhgh',
            withdrawal: 3060,
            deposit: 10754,
            balance: 1237894,
        },
        {
            id: 4,
            date: '12-06-2018',
            particulars: 'abc',
            withdrawal: 2000,
            deposit: 9754,
            balance: 1237894,
        },
        {
            id: 5,
            date: '27-02-2019',
            particulars: 'bhg',
            withdrawal: 5000,
            deposit: 9754,
            balance: 1237894,
        },
    ];
    term: any;
    fileName = 'SheetJS.xlsx';
    export(): void {
        const element = document.getElementById('GenerateTable');
        /* generate worksheet */
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
    constructor() {}
    ngOnInit() {}
}
