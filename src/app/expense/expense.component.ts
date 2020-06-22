import { Component, OnInit } from '@angular/core';
import { ExpenseCorpusService } from '@app/expense/services';
import { SessionStorageService } from 'ngx-webstorage';
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
    bankName: any;
    chequeNo: any;
    chequeDate: any;
    type: any;
    balance = 0;
    userId: any;
    constructor(
        private expenseService: ExpenseCorpusService,
        public session: SessionStorageService
    ) {}
    send() {
        if (this.cash) {
            this.type = 'Cash';
        } else {
            this.type = 'Cheque';
        }
        const accountData = {
            debit: this.debitAmount,
            particulars: this.purpose,
            mode: this.type,
            type: 'Expense',
            date: this.date,
            bankName: this.bankName,
            chequeNo: this.chequeNo,
            chequeDate: this.chequeDate,
            userId: this.userId,
        };
        this.expenseService.sendData(accountData).subscribe(
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
                        this.bankName = null;
                        this.chequeNo = null;
                        this.chequeDate = null;
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
        const user = this.session.retrieve('user');
        this.userId = user.id;
    }
    showCash() {
        this.cash = true;
        this.cheque = false;
    }
    showCheque() {
        this.cheque = true;
        this.cash = false;
    }
}
