import { Component, OnInit } from '@angular/core';
import { DebitEntryService } from '@app/debit-entry/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditEntryService } from '@app/credit-entry/services';
@Component({
    selector: 'sb-debit-entry',
    templateUrl: './debit-entry.component.html',
    styleUrls: ['./debit-entry.component.scss'],
})
export class DebitEntryComponent implements OnInit {
    searchForm: FormGroup;
    text: any;
    debitAmount: any;
    purpose: any;
    type: any;
    data: any;
    bankName: any;
    chequeNo: any;
    chequeDate: any;
    name: any;
    date: any;
    balance = 0;
    table = false;
    bankList: any;
    corpusData = 0;
    constructor(private debitService: DebitEntryService, public fb: FormBuilder) {
        this.searchForm = this.fb.group({
            employeeNo: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    send() {
        if (!this.text || !this.debitAmount || !this.purpose || !this.type || !this.date) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill all the details!',
                icon: 'error',
            });
        } else {
            const accountData = {
                userId: this.text,
                debit: this.debitAmount,
                particulars: this.purpose,
                mode: this.type,
                type: 'Operational',
                date: this.date,
                chequeDate: this.chequeDate,
                chequeNo: this.chequeNo,
                bankName: this.bankName,
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
                            this.debitAmount = null;
                            this.purpose = null;
                            this.date = null;
                            this.chequeDate = null;
                            this.chequeNo = null;
                            this.bankName = null;
                            this.balance = 0;
                            this.type = null;
                            this.searchForm = this.fb.group({
                                employeeNo: new FormControl('', Validators.compose([Validators.required])),
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
    showTable() {
        // @ts-ignore
        this.text = this.searchForm.get('employeeNo').value;
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
    ngOnInit() {
        this.debitService.getBankList().subscribe(result => {
            this.bankList = result;
            console.log(this.bankList);
        });
        this.debitService.getCorpusData().subscribe(
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
