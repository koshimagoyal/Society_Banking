import { Component, OnInit } from '@angular/core';
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
    constructor(private service: MiscellaneousService, public session: SessionStorageService) {}

    ngOnInit() {
        const user = this.session.retrieve('user');
        this.text = user.id;
    }

    send() {
        if (this.cash) {
            const data = {
                userId: this.text,
                date: this.date,
                mode: 'Cash',
                type: 'Transfer',
                amount: this.amount,
                bankName: this.bankName,
                cashPurpose: 'Transfered to ' + this.bankName + ' on ' + this.date,
                bankPurpose: 'Transfered from Cash Account on ' + this.date,
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
                date: this.date,
                mode: 'Cheque',
                type: 'Withdraw',
                amount: this.amount,
                bankName: this.bankName,
                chequeDate: this.chequeDate,
                chequeNo: this.chequeNo,
                cashPurpose: 'Transfered from ' + this.bankName + ' on ' + this.date,
                bankPurpose: 'Transfered to Cash Account on ' + this.date,
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
