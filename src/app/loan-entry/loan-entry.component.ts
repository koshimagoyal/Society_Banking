import { Component, OnInit } from '@angular/core';
import { ExpenseCorpusService } from '@app/expense/services';
import { LoanEntryService } from '@app/loan-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-loan-entry',
    templateUrl: './loan-entry.component.html',
    styleUrls: ['./loan-entry.component.scss'],
})
export class LoanEntryComponent implements OnInit {
    text: any;
    table = false;
    loanAmount: any;
    duration: any;
    type: any;
    data: any;
    name: any;
    date: any;
    corpusData = 0;
    loanNo = 0;
    eligible = true;
    constructor(
        private loanService: LoanEntryService,
        private expenseService: ExpenseCorpusService
    ) {}
    showTable() {
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
                    // tslint:disable-next-line:prefer-for-of
                    this.loanNo = result.loan[0].length;
                    console.log(this.loanNo);
                    this.name = result.nameData[0].name;
                    this.table = true;
                    this.eligible = this.loanNo < 3;
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
        return this.eligible;
    }
    focusoutHandler($event: any) {
        if ($event.target.value) {
            this.eligible = true;
        } else {
            this.eligible = false;
        }
    }
    send() {
        let loanType;
        if (this.type === 'Personal Loan') {
            loanType = 1;
        } else {
            loanType = 2;
        }
        this.data = {
            userId: this.text,
            loanAmount: this.loanAmount,
            loanDuration: this.duration,
            date: this.date,
            closeLoan: false,
            type: loanType,
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
    ngOnInit() {
        this.expenseService.getData().subscribe(
            result => {
                console.log(result);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < result.balance.length; i++) {
                    this.corpusData =
                        this.corpusData +
                        result.balance[i].creditAmount -
                        result.balance[i].expenseDebitAmount;
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
}
