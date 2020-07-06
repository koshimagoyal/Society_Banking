import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { GenerateEmiService } from '@app/generate-emi/services';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';
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
    show = false;
    term: any;
    data = [];
    fileName = 'EMI to be deducted.xlsx';
    emiDate = new FormControl(moment());
    showTable() {
        const mm = this.emiDate.value.format('MM');
        const yy = this.emiDate.value.format('YYYY');
        const send = {
            month: mm,
            year: yy,
        };
        console.log(send);
        this.generateService.getData(send).subscribe(
            result => {
                console.log(result);
                if (result.loanData.length !== 0) {
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.loanData.length; i++) {
                        const principle = result.loanData[i].loanAmount;
                        const r = result.loanData[i].interest / 1200;
                        const d = result.loanData[i].loanDuration;
                        // @ts-ignore
                        const emi = [principle * r * Math.pow(1 + r, d)] / [Math.pow(1 + r, d)-1];
                        this.data.push({
                            // @ts-ignore
                            userId: result.loanData[i].userId,
                            // @ts-ignore
                            loanAmount: result.loanData[i].loanAmount,
                            // @ts-ignore
                            loanDuration: result.loanData[i].loanDuration,
                            // @ts-ignore
                            loanType: result.loanData[i].loanType,
                            // @ts-ignore
                            EMI: (Math.round(emi * 100) / 100).toFixed(0),
                        });
                    }
                    this.show = true;
                } else {
                    this.show = false;
                    Swal.fire({
                        title: 'Oops!',
                        text: 'No Data exists!',
                        icon: 'error',
                    });
                }
            },
            error1 => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Try again!',
                    icon: 'error',
                });
            }
        );
        console.log(this.data);
        return this.data;
    }
    export(): void {
        const element = document.getElementById('GenerateTable');
        /* generate worksheet */
        // @ts-ignore
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data, {
            header: ['userId', 'loanAmount', 'loanDuration', 'loanType', 'EMI'],
            skipHeader: true,
            // @ts-ignore
            origin: 'A4',
        });
        XLSX.utils.sheet_add_json(
            ws,
            [{ 'Month and Year': 'Month and Year', 'Date': this.emiDate.value.format('MM-YYYY') }],
            {
                header: ['Month and Year', 'Date'],
                skipHeader: true,
                origin: 'A1',
            }
        );
        XLSX.utils.sheet_add_json(
            ws,
            [
                {
                    h1: 'Employee Id',
                    h2: 'Loan Amount (in INR)',
                    h3: 'Loan Duration (in Months)',
                    h4: 'Loan Type',
                    h5: 'EMI to be deducted(in INR)',
                },
            ],
            {
                header: ['h1', 'h2', 'h3', 'h4', 'h5'],
                skipHeader: true,
                origin: 'A3',
            }
        );
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }
    constructor(private generateService: GenerateEmiService) {}
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
        this.show = false;
    }
    ngOnInit() {}
}
