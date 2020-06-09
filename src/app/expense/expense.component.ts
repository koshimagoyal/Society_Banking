import { Component, OnInit } from '@angular/core';
import { ExpenseCorpusService } from '@app/expense/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'sb-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
    debitAmount: any;
    cash = true;
    cheque = false;
    purpose: any;
    date: any;
    balance = 0;
    constructor(private expenseService: ExpenseCorpusService) {}
    send() {
        const data = {
            debit: this.debitAmount,
            remark: this.purpose,
            date: this.date,
        };
        this.expenseService.sendData(data).subscribe(
            result => {
                Swal.fire({
                    text: 'Sent!',
                    icon: 'success',
                }).then((isConfirm: any) => {
                    if (isConfirm) {
                        this.balance -= this.debitAmount;
                        this.date = '';
                        this.debitAmount = null;
                        this.purpose = null;
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
                if (result.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'No entry till now!',
                        icon: 'error',
                    });
                } else {
                    console.log(result);
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.balance.length; i++) {
                        this.balance =
                            this.balance +
                            result.balance[i].creditAmount -
                            result.balance[i].expenseDebitAmount;
                    }
                    console.log(this.balance);
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
        return this.balance;
    }
    showCash(){
        this.cash = true;
        this.cheque = false;
    }
    showCheque() {
        this.cheque = true;
        this.cash = false;
    }
}
