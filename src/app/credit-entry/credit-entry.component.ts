import { Component, OnInit } from '@angular/core';
import { CreditEntryService } from '@app/credit-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanEntryService } from '@app/loan-entry/services';

@Component({
    selector: 'sb-credit-entry',
    templateUrl: './credit-entry.component.html',
    styleUrls: ['./credit-entry.component.scss'],
})
export class CreditEntryComponent implements OnInit {
    searchForm: FormGroup;
    text: any;
    type: any;
    table = false;
    creditAmount: any;
    purpose: any;
    bankName: any;
    chequeDate: any;
    chequeNo: any;
    data: any;
    name: any;
    date: any;
    balance = 0;
    corpusData = 0;
    constructor(private creditService: CreditEntryService, public fb: FormBuilder) {
        this.searchForm = this.fb.group({
            employeeNo: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    showTable() {
        // @ts-ignore
        this.text = this.searchForm.get('employeeNo').value;
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
        if (!this.text || !this.creditAmount || !this.purpose || !this.type || !this.date) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill all the details!',
                icon: 'error',
            });
        } else {
            const accountData = {
                userId: this.text,
                credit: this.creditAmount,
                particulars: this.purpose,
                mode: this.type,
                type: 'Operational',
                date: this.date,
                bankName: this.bankName,
                chequeDate: this.chequeDate,
                chequeNo: this.chequeNo,
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
                            this.creditAmount = null;
                            this.purpose = null;
                            this.date = null;
                            this.balance = 0;
                            this.chequeNo = null;
                            this.chequeDate = null;
                            this.bankName = null;
                            this.type = null;
                            this.searchForm = this.fb.group({
                                employeeNo: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
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
        this.creditService.getCorpusData().subscribe(
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
}
