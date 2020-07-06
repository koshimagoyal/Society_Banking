import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM-YYYY',
    },
    display: {
        dateInput: 'MM-YYYY',
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
    emiData = [[,], [,]];
    term: any;
    p: any;
    page: any;
    searchTerm: any;
    show = false;
    emiTable = false;
    date = new FormControl(moment(new Date('01-01-2000')));
    emiDate = new FormControl(moment(new Date('01-01-2000')));
    disableData = [];
    disableLoanData = [];
    disableLoan: any;
    inputReadonly = true;
    constructor(private tableService: TablesService) {}
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
    ngOnInit() {
        this.tableService.getData().subscribe(result => {
            console.log(result);
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < result.length; i++) {
                if (result[i].sheetName.includes('Deposits')) {
                    // @ts-ignore
                    this.disableData.push(moment(result[i].dateOfSheet, 'MM-YYYY'));
                } else {
                    // @ts-ignore
                    this.disableLoanData.push(moment(result[i].dateOfSheet, 'MM-YYYY'));
                }
            }
        });
        this.disable = (d: Moment): boolean => {
            // @ts-ignore
            return !this.disableData.find(
                x => d.month() === moment(x).month() && d.year() === moment(x).year()
            );
        };
        this.disableLoan = (d: Moment): boolean => {
            return !this.disableLoanData.find(
                x => d.month() === moment(x).month() && d.year() === moment(x).year()
            );
        };
    }
    onChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = evt.target as DataTransfer;
        if (target.files.length !== 1) {
            Swal.fire({
                title: 'Oops!',
                text: 'File Already Uploaded!',
                icon: 'error',
            }).then((isConfirm: any) => {
                if (isConfirm) {
                    this.emiTable = false;
                    this.emiDate.setValue('');
                    evt.target.value = null;
                }
            });
            throw new Error('Cannot use multiple files');
        }
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
        formData.append('date', this.date.value.format('MM-YYYY'));
        console.log(formData);
        this.tableService.uploadFile(formData).subscribe(
            result => {
                if (result) {
                    const send = {
                        data: this.data,
                        date: this.date.value.format('MM-YYYY'),
                    };
                    this.tableService.sendData(send).subscribe(
                        res => {
                            if (res) {
                                Swal.fire({
                                    text: 'Data Successfully Inserted',
                                    icon: 'success',
                                }).then((isConfirm: any) => {
                                    if (isConfirm) {
                                        // @ts-ignore
                                        this.disableData.push(moment(send.date, 'MM-YYYY'));
                                        this.disable = (d: Moment): boolean => {
                                            return !this.disableData.find(
                                                x =>
                                                    d.month() === moment(x).month() &&
                                                    d.year() === moment(x).year()
                                            );
                                        };
                                        this.date = new FormControl(moment(new Date('01-01-2000')));
                                        this.show = false;
                                        evt.target.value = null;
                                    }
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
    }

    onFileChange(evt: any) {
        /* wire up file reader */
        const target: DataTransfer = evt.target as DataTransfer;
        if (target.files.length !== 1) {
            Swal.fire({
                title: 'Oops!',
                text: 'File Already Uploaded!',
                icon: 'error',
            }).then((isConfirm: any) => {
                if (isConfirm) {
                    this.emiTable = false;
                    this.emiDate.setValue('');
                    evt.target.value = null;
                }
            });
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.emiTable = true;
            this.emiData = XLSX.utils.sheet_to_json(ws, { header: 1 });
            this.emiData = this.emiData.slice(2);
            console.log(this.emiData);
        };
        reader.readAsBinaryString(target.files[0]);
        const formData: FormData = new FormData();
        formData.append('file', evt.target.files[0], evt.target.files[0].name);
        formData.append('date', this.emiDate.value.format('MM-YYYY'));
        console.log(formData);
        this.tableService.uploadFile(formData).subscribe(
            result => {
                if (result) {
                    const send = {
                        data: this.emiData,
                        date: this.emiDate.value.format('MM-YYYY'),
                    };
                    this.tableService.sendLoanData(send).subscribe(
                        res => {
                            if (res) {
                                this.tableService.getEmiData().subscribe(emiResData => {
                                    console.log(emiResData);
                                    if (emiResData.length !== 0) {
                                        const closeData = [];
                                        // tslint:disable-next-line:prefer-for-of
                                        for (let i = 0; i < emiResData.length; i++) {
                                            if (
                                                emiResData[i].month === emiResData[i].loanDuration
                                            ) {
                                                closeData.push({
                                                    loanId: emiResData[i].loanId,
                                                    date: send.date,
                                                    status: 'Auto Closure',
                                                    close: true,
                                                });
                                            }
                                        }
                                        this.tableService.closeLoan(closeData).subscribe(r => {
                                            if (r) {
                                                Swal.fire({
                                                    text: 'Data Successfully Inserted',
                                                    icon: 'success',
                                                }).then((isConfirm: any) => {
                                                    if (isConfirm) {
                                                        // @ts-ignore
                                                        this.disableLoanData.push(
                                                            // @ts-ignore
                                                            moment(send.date, 'MM-YYYY')
                                                        );
                                                        this.disableLoan = (d: Moment): boolean => {
                                                            return !this.disableLoanData.find(
                                                                x =>
                                                                    d.month() ===
                                                                        moment(x).month() &&
                                                                    d.year() === moment(x).year()
                                                            );
                                                        };
                                                        this.emiDate = new FormControl(moment(new Date('01-01-2000')));
                                                        this.emiTable = false;
                                                        evt.target.value = null;
                                                    }
                                                });
                                            } else {
                                                console.log(r);
                                            }
                                        });
                                    } else {
                                        Swal.fire({
                                            text: 'Data Successfully Inserted',
                                            icon: 'success',
                                        }).then((isConfirm: any) => {
                                            if (isConfirm) {
                                                // @ts-ignore
                                                this.disableData.push(
                                                    // @ts-ignore
                                                    moment(send.date, 'MM-YYYY')
                                                );
                                                this.disable = (d: Moment): boolean => {
                                                    return !this.disableData.find(
                                                        x =>
                                                            d.month() === moment(x).month() &&
                                                            d.year() === moment(x).year()
                                                    );
                                                };
                                                this.emiDate = new FormControl();
                                                this.emiTable = false;
                                                evt.target.value = null;
                                            }
                                        });
                                    }
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
    }
}
