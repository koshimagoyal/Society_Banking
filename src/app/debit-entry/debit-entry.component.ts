import { Component, OnInit } from '@angular/core';
import { DebitEntryService } from '@app/debit-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'sb-debit-entry',
    templateUrl: './debit-entry.component.html',
    styleUrls: ['./debit-entry.component.scss'],
})
export class DebitEntryComponent implements OnInit {
    text: any;
    debitAmount: any;
    purpose: any;
    mode: any;
    type: any;
    data: any;
    name: any;
    date: any;
    balance = 0;
    table = false;
    constructor(private debitService: DebitEntryService) {}
    send() {
        const accountData = {
            userId: this.text,
            debit: this.debitAmount,
            remark: this.purpose,
            date: this.date,
        };
        this.debitService.sendData(accountData).subscribe(
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
    showTable() {
        console.log(this.text);
        this.debitService.getData(this.text).subscribe(
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
    debit($event: any) {
        console.log(this.balance);
        if ($event.target.value > this.balance) {
            Swal.fire({
                title: 'Oops!',
                text: 'Balance is less than debit amount',
                icon: 'error',
            });
        }
    }
    ngOnInit(): void {}
}
