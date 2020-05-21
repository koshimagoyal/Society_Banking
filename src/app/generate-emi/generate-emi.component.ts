import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
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
    selector: 'sb-generate-emi',
    templateUrl: './generate-emi.component.html',
    styleUrls: ['./generate-emi.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class GenerateEmiComponent implements OnInit {
    p: any;
    countries = [
        {
            id: 1,
            deposit: 9754,
        },
        {
            id: 2,
            deposit: 974,
        },
        {
            id: 3,
            deposit: 10754,
        },
        {
            id: 4,
            deposit: 9754,
        },
        {
            id: 5,
            deposit: 9754,
        },
    ];
    term: any;
    fileName = 'EMI to be deducted.xlsx';
    emiDate = new FormControl(moment());
    export(): void {
        const element = document.getElementById('GenerateTable');
        /* generate worksheet */
        // @ts-ignore
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.countries, {
            header: ['id','deposit'],
            skipHeader: true,
            // @ts-ignore
            origin: 'A4',
        });
        XLSX.utils.sheet_add_json(ws,
            [{ 'Month and Year': 'Month and Year - ' + this.emiDate.value.format('MM-YYYY') }],
            {
                header: ['Month and Year'],
                skipHeader: true,
                origin: 'A1',
            }
        );
        XLSX.utils.sheet_add_json(ws, [{ h1: 'Employee Id', h2: 'EMI to be deducted' }], {
            header: ['h1', 'h2'],
            skipHeader: true,
            origin: 'A3',
        });
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
    constructor() {}
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
    ngOnInit() {}
}
