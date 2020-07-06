import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MiscellaneousService } from '@app/miscellaneous-page/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-miscellaneous-page',
    templateUrl: './miscellaneous-page.component.html',
    styleUrls: ['./miscellaneous-page.component.scss'],
})
export class MiscellaneousPageComponent implements OnInit {
    cheque = false;
    cash = false;
    search = true;
    table = false;
    date: any;
    amount: any;
    bankName: any;
    chequeDate: any;
    chequeNo: any;
    employeeId: any;
    employeeName: any;
    text: any;
    purpose: any;
    bankList: any;
    searchForm: FormGroup;
    cashForm: FormGroup;
    chequeForm: FormGroup;
    constructor(
        private service: MiscellaneousService,
        public session: SessionStorageService,
        public fb: FormBuilder
    ) {
        this.searchForm = this.fb.group({
            chequeNo: new FormControl('', Validators.compose([Validators.required])),
        });
        this.cashForm = this.fb.group({
            date: new FormControl('', Validators.compose([Validators.required])),
            amount: new FormControl('', Validators.compose([Validators.required])),
            bankName: new FormControl('', Validators.compose([Validators.required])),
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

    ngOnInit() {
        this.service.getBankList().subscribe(result => {
            this.bankList = result;
            console.log(this.bankList);
        });
        const user = this.session.retrieve('user');
        this.text = user.id;
    }

    send() {
        if (this.cash) {
            const data = {
                userId: this.text,
                // @ts-ignore
                date: this.cashForm.get('date').value,
                mode: 'Cash',
                type: 'Transfer',
                // @ts-ignore
                amount: this.cashForm.get('amount').value,
                // @ts-ignore
                bankName: this.cashForm.get('bankName').value,
                cashPurpose:
                    'Transfered to ' +
                    // @ts-ignore
                    this.cashForm.get('bankName').value +
                    ' on ' +
                    // @ts-ignore
                    this.cashForm.get('date').value,
                // @ts-ignore
                bankPurpose: 'Transfered from Cash Account on ' + this.cashForm.get('date').value,
            };
            console.log(data);
            this.service.transferCash(data).subscribe(
                result => {
                    Swal.fire({
                        text: 'Sent!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            // @ts-ignore
                            this.date = null;
                            this.chequeNo = null;
                            this.chequeDate = null;
                            this.bankName = null;
                            this.purpose = null;
                            this.employeeId = null;
                            this.employeeName = null;
                            this.amount = null;
                            this.cashForm = this.fb.group({
                                date: new FormControl('', Validators.compose([Validators.required])),
                                amount: new FormControl('', Validators.compose([Validators.required])),
                                bankName: new FormControl('', Validators.compose([Validators.required])),
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
            const data = {
                userId: this.text,
                // @ts-ignore
                date: this.chequeForm.get('date').value,
                mode: 'Cheque',
                type: 'Withdraw',
                // @ts-ignore
                amount: this.chequeForm.get('amount').value,
                // @ts-ignore
                bankName: this.chequeForm.get('bankName').value,
                // @ts-ignore
                chequeDate: this.chequeForm.get('chequeDate').value,
                // @ts-ignore
                chequeNo: this.chequeForm.get('chequeNo').value,
                // @ts-ignore
                cashPurpose:
                    'Transfered from ' +
                    // @ts-ignore
                    this.chequeForm.get('bankName').value +
                    ' on ' +
                    // @ts-ignore
                    this.chequeForm.get('date').value,
                // @ts-ignore
                bankPurpose: 'Transfered to Cash Account on ' + this.chequeForm.get('date').value,
            };
            console.log(data);
            this.service.withdrawCash(data).subscribe(
                result => {
                    Swal.fire({
                        text: 'Sent!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            // @ts-ignore
                            this.date = null;
                            this.chequeNo = null;
                            this.chequeDate = null;
                            this.bankName = null;
                            this.purpose = null;
                            this.employeeId = null;
                            this.employeeName = null;
                            this.amount = null;
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

    showCheque() {
        this.cheque = true;
        this.search = false;
        this.cash = false;
        this.date = null;
        this.chequeNo = null;
        this.chequeDate = null;
        this.bankName = null;
        this.purpose = null;
        this.employeeId = null;
        this.employeeName = null;
        this.amount = null;
        this.searchForm = this.fb.group({
            chequeNo: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    showCash() {
        this.cheque = false;
        this.search = false;
        this.cash = true;
        this.date = null;
        this.chequeNo = null;
        this.chequeDate = null;
        this.bankName = null;
        this.purpose = null;
        this.employeeId = null;
        this.employeeName = null;
        this.amount = null;
    }

    showTable() {
        this.date = null;
        this.chequeDate = null;
        this.bankName = null;
        this.purpose = null;
        this.employeeId = null;
        this.employeeName = null;
        this.amount = null;
        this.table = false;
        // @ts-ignore
        this.chequeNo = this.searchForm.get('chequeNo').value;
        console.log(this.chequeNo);
        this.service.searchCheque(this.chequeNo).subscribe(
            result => {
                console.log(result.data);
                if (result.data.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This cheque does not exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result.data);
                    this.date = result.data[0].date;
                    this.chequeDate = result.data[0].chequeDate;
                    this.bankName = result.data[0].bankName;
                    this.purpose = result.data[0].particulars;
                    this.employeeId = result.data[0].userId;
                    this.employeeName = result.data[0].name;
                    if (result.data[0].credit) {
                        this.amount = result.data[0].credit;
                    } else {
                        this.amount = result.data[0].debit;
                    }
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

    showSearch() {
        this.cheque = false;
        this.search = true;
        this.cash = false;
    }
}
