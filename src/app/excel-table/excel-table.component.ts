import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'sb-excel-table',
  templateUrl: './excel-table.component.html',
  styleUrls: ['./excel-table.component.scss']
})
export class ExcelTableComponent implements OnInit {
    data = [];
    constructor() {}
    onChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = evt.target as DataTransfer;
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            // resolve(result);
        };
        reader.readAsBinaryString(target.files[0]);
    }
    ngOnInit(): void {}
}
