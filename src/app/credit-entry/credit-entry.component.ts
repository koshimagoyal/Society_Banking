import { Component, OnInit } from '@angular/core';
import { CreditEntryService } from '@app/credit-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-credit-entry',
    templateUrl: './credit-entry.component.html',
    styleUrls: ['./credit-entry.component.scss'],
})
export class CreditEntryComponent implements OnInit {
    text: any;
    type: any;
    table = false;
    creditAmount: any;
    purpose: any;
    data: any;
    name: any;
    date: any;
    balance = 0;
    constructor(private creditService: CreditEntryService) {}
    showTable() {
        console.log(this.text);
        this.creditService.getData(this.text).subscribe(
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
                    for (let i = 0; i < result.balance.length; i++) {
                        this.balance =
                            this.balance + result.balance[i].credit - result.balance[i].debit;
                    }
                    console.log(this.balance);
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
        return this.balance;
    }
    send() {
        const accountData = {
            userId: this.text,
            credit: this.creditAmount,
            remark: this.purpose,
            date: this.date,
        };
        this.creditService.sendData(accountData).subscribe(
            result => {
                Swal.fire({
                    text: 'Sent!',
                    icon: 'success',
                }).then((isConfirm: any) => {
                    if (isConfirm) {
                        // @ts-ignore
                        this.table = false;
                        this.text = null;
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
    ngOnInit(): void {}
}
