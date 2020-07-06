import { Component, OnInit } from '@angular/core';
import { ExpenseCorpusService } from '@app/expense/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    cashForm: FormGroup;
    chequeForm: FormGroup;
    bankList: any;
    constructor(
        private expenseService: ExpenseCorpusService,
        public session: SessionStorageService,
        public fb: FormBuilder
    ) {
        this.cashForm = this.fb.group({
            date: new FormControl('', Validators.compose([Validators.required])),
            amount: new FormControl('', Validators.compose([Validators.required])),
            purpose: new FormControl('', Validators.compose([Validators.required])),
        });
        this.chequeForm = this.fb.group({
            date: new FormControl('', Validators.compose([Validators.required])),
            amount: new FormControl('', Validators.compose([Validators.required])),
            bankName: new FormControl('', Validators.compose([Validators.required])),
            chequeDate: new FormControl('', Validators.compose([Validators.required])),
            chequeNo: new FormControl('', Validators.compose([Validators.required])),
            purpose: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    send() {
        if (this.cash) {
            this.type = 'Cash';
            const accountData = {
                // @ts-ignore
                debit: this.cashForm.get('amount').value,
                // @ts-ignore
                particulars: this.cashForm.get('purpose').value,
                mode: this.type,
                type: 'Expense',
                // @ts-ignore
                date: this.cashForm.get('date').value,
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
                            this.cashForm = this.fb.group({
                                date: new FormControl('', Validators.compose([Validators.required])),
                                amount: new FormControl('', Validators.compose([Validators.required])),
                                purpose: new FormControl('', Validators.compose([Validators.required])),
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
        } else {
            this.type = 'Cheque';
            const accountData = {
                // @ts-ignore
                debit: this.chequeForm.get('amount').value,
                // @ts-ignore
                particulars: this.chequeForm.get('purpose').value,
                mode: this.type,
                type: 'Expense',
                // @ts-ignore
                date: this.chequeForm.get('date').value,
                // @ts-ignore
                bankName: this.chequeForm.get('bankName').value,
                // @ts-ignore
                chequeNo: this.chequeForm.get('chequeNo').value,
                // @ts-ignore
                chequeDate: this.chequeForm.get('chequeDate').value,
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
                            this.cashForm = this.fb.group({
                                date: new FormControl('', Validators.compose([Validators.required])),
                                amount: new FormControl('', Validators.compose([Validators.required])),
                                purpose: new FormControl('', Validators.compose([Validators.required])),
                            });
                            this.chequeForm = this.fb.group({
                                date: new FormControl('', Validators.compose([Validators.required])),
                                amount: new FormControl('', Validators.compose([Validators.required])),
                                bankName: new FormControl('', Validators.compose([Validators.required])),
                                chequeDate: new FormControl('', Validators.compose([Validators.required])),
                                chequeNo: new FormControl('', Validators.compose([Validators.required])),
                                purpose: new FormControl('', Validators.compose([Validators.required])),
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
        this.expenseService.getBankList().subscribe(result => {
            this.bankList = result;
            console.log(this.bankList);
        });
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
