import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { TablesService } from '@app/excel-table/services';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import * as XLSX from 'xlsx';
type AOA = any[][];

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM/YYYY',
    },
    display: {
        dateInput: 'MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'sb-excel-table',
    templateUrl: './excel-table.component.html',
    styleUrls: ['./excel-table.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class ExcelTableComponent implements OnInit {
    disable: any;
    data = [[,], [,]];
    emiData: AOA = [[,], [,]];
    term: any;
    p: any;
    page: any;
    searchTerm: any;
    show = false;
    emiTable = false;
    date = new FormControl(moment());
    emiDate = new FormControl(moment());
    disableData = [];
    constructor(private tableService: TablesService) {}
    ngOnInit() {
        this.tableService.getData().subscribe(result => {
            for (let i = 0; i < result.length; i++) {
                // @ts-ignore
                this.disableData.push(result[i].monthYear);
            }
        });
        this.disable = (d: Moment): boolean => {
            return !this.disableData.find(x => x === d.format('MM/YYYY'));
        };
    }
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
            this.show = true;
            console.log(this.data);
        };
        reader.readAsBinaryString(target.files[0]);
        console.log(target.files[0]);
        const formData: FormData = new FormData();
        formData.append('file', evt.target.files[0], evt.target.files[0].name);
        formData.append('date', this.date.value.format('MM/YYYY'));
        console.log(formData);
        this.tableService.uploadFile(formData).subscribe(result => {
            if (result) {
                const send = {
                    data: this.data,
                    date: this.date.value.format('MM/YYYY'),
                };
                this.tableService.sendData(send).subscribe(res => {
                    if (res) {
                        // @ts-ignore
                        this.disableData.push(send.date);
                        this.disable = (d: Moment): boolean => {
                            return !this.disableData.find(x => x === d.format('MM/YYYY'));
                        };
                    }
                });
            }
        });
    }

    onFileChange(evt: any) {
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
            this.emiTable = true;
            /* save data */
            this.emiData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as AOA;
            console.log(this.emiData);
        };
        reader.readAsBinaryString(target.files[0]);
        /*const formData: FormData = new FormData();
        formData.append('file', evt.target.files[0], evt.target.files[0].name);
        formData.append('date', this.emiDate.value.format('MM/YYYY'));
        console.log(formData);
        this.tableService.uploadFile(formData).subscribe(result => {
            if (result) {
                const send = {
                    data: this.emiData,
                    date: this.emiDate.value.format('MM/YYYY'),
                };
                this.tableService.sendLoanData(send).subscribe(res => console.log(res));
            }
        });*/
    }

    chosenYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    }

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

    chosenAnotherYearHandler(normalizedYear: Moment) {
        const ctrlValue = this.emiDate.value;
        ctrlValue.year(normalizedYear.year());
        this.emiDate.setValue(ctrlValue);
    }

    chosenAnotherMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.emiDate.value;
        ctrlValue.month(normalizedMonth.month());
        this.emiDate.setValue(ctrlValue);
        datepicker.close();
    }
}
