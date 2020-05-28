import { Component, OnInit } from '@angular/core';
import { AddCorpusService } from '@app/add-corpus/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-add-corpus',
    templateUrl: './add-corpus.component.html',
    styleUrls: ['./add-corpus.component.scss'],
})
export class AddCorpusComponent implements OnInit {
    creditAmount: any;
    purpose: any;
    date: any;
    balance = 0;
    constructor(private addService: AddCorpusService) {}
    send() {
        const data = {
            credit: this.creditAmount,
            remark: this.purpose,
            date: this.date,
        };
        this.addService.sendData(data).subscribe(
            result => {
                Swal.fire({
                    text: 'Sent!',
                    icon: 'success',
                }).then((isConfirm: any) => {
                    if (isConfirm) {
                        this.balance += this.creditAmount;
                        this.date = '';
                        this.creditAmount = null;
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
        this.addService.getData().subscribe(
            result => {
                console.log(result);
                if (result.length === 0) {
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

}
