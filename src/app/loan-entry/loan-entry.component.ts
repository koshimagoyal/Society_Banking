import { Component, OnInit } from '@angular/core';
import { ExpenseCorpusService } from '@app/expense/services';
import { LoanEntryService } from '@app/loan-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-loan-entry',
    templateUrl: './loan-entry.component.html',
    styleUrls: ['./loan-entry.component.scss'],
})
export class LoanEntryComponent implements OnInit {
    searchForm: FormGroup;
    text: any;
    depositData = 23478;
    table = false;
    loanAmount: any;
    duration: any;
    type: any;
    data: any;
    name: any;
    interest: any;
    date: any;
    corpusData = 0;
    show = false;
    loans: any;
    p: any;
    loanTerm: any;
    constructor(private loanService: LoanEntryService, public fb: FormBuilder) {
        this.searchForm = this.fb.group({
            employeeNo: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    showTable() {
        // @ts-ignore
        this.text = this.searchForm.get('employeeNo').value;
        console.log(this.text);
        this.loanService.getData(this.text).subscribe(
            result => {
                console.log(result);
                if (result.nameData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This user does not exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result);
                    this.name = result.nameData[0].name;
                    this.table = true;
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
    focusoutHandler($event: any) {
        if ($event.target.checked) {
            this.loanService.getAllData(this.text).subscribe(
                result => {
                    if (result) {
                        console.log(result);
                        if (result.length === 0) {
                            Swal.fire({
                                title: 'Oops!',
                                text: 'No Previous Loan Exists!',
                                icon: 'error',
                            });
                        } else {
                            this.loanTerm = [result.loanData.length];
                            this.loans = result.loanData;
                            this.show = true;
                        }
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
        } else {
            this.show = false;
        }
    }
    send() {
        if (
            !this.text ||
            !this.loanAmount ||
            !this.duration ||
            !this.date ||
            !this.type ||
            !this.interest
        ) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill all the details!',
                icon: 'error',
            });
        } else {
            this.data = {
                userId: this.text,
                loanAmount: this.loanAmount,
                loanDuration: this.duration,
                date: this.date,
                loanType: this.type,
                interest: this.interest,
                closeLoan: false,
            };
            this.loanService.sendData(this.data).subscribe(
                result => {
                    Swal.fire({
                        text: 'Sent!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            // @ts-ignore
                            this.table = false;
                            this.text = null;
                            this.date = null;
                            this.loanAmount = null;
                            this.type = null;
                            this.duration = null;
                            this.interest = null;
                            this.show = false;
                            this.searchForm = this.fb.group({
                                employeeNo: new FormControl('', Validators.compose([Validators.required])),
                            });
                        }
                    });
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
    ngOnInit() {
        this.loanService.getCorpusData().subscribe(
            result => {
                console.log(result);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < result.balance.length; i++) {
                    this.corpusData =
                        this.corpusData + result.balance[i].credit - result.balance[i].debit;
                }
                console.log(this.corpusData);
            },
            error1 => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Try again!',
                    icon: 'error',
                });
            }
        );
        return this.corpusData;
    }
    isDate(d: any) {
        const result = Date.parse(d);
        if (!result) return false;
        else return true;
    }
}
