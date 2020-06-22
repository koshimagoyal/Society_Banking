import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/loan-foreclosure/dialog/dialog.component';
import { LoanForeclosureService } from '@app/loan-foreclosure/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-loan-foreclosure',
    templateUrl: './loan-foreclosure.component.html',
    styleUrls: ['./loan-foreclosure.component.scss'],
})
export class LoanForeclosureComponent implements OnInit {
    text: any;
    name: any;
    table = false;
    disable = true;
    date: any;
    loanData = [];
    loanType: any;
    loanAmount: any;
    payAmount = 0;
    type: any;
    bankName: any;
    chequeDate: any;
    chequeNo: any;
    purpose: any;
    loanDate: any;
    payMode: any;
    constructor(private loanService: LoanForeclosureService, private dialog: MatDialog) {}
    showTable() {
        const data = {
            userId: this.text,
        };
        console.log(data);
        this.loanService.getData(data).subscribe(
            result => {
                console.log(result);
                if (result.nameData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This user does not exists!',
                        icon: 'error',
                    });
                } else if (!result.loanData || result.loanData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'No loan exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result.loanData);
                    this.payMode = new Array(result.loanData.length);
                    this.bankName = new Array(result.loanData.length);
                    this.purpose = new Array(result.loanData.length);
                    this.chequeDate = new Array(result.loanData.length);
                    this.chequeNo = new Array(result.loanData.length);
                    this.type = new Array(result.loanData.length);
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < result.loanData.length; j++) {
                        this.loanAmount = result.loanData[j].loanData.loanAmount;
                        this.loanDate = result.loanData[j].loanData.date;
                        this.payAmount = this.loanAmount;
                        if (result.loanData[j].loanBook) {
                            // tslint:disable-next-line:prefer-for-of
                            for (let k = 0; k < result.loanData[j].loanBook.length; k++) {
                                const amount =
                                    result.loanData[j].loanBook[k].credit *
                                    (result.loanData[j].loanData.interest / 100);
                                this.payAmount -= amount;
                            }
                        }
                        this.loanType = result.loanData[0].loanData.loanType;
                        this.loanData.push({
                            // @ts-ignore
                            loanId: result.loanData[0].loanData.loanId,
                            // @ts-ignore
                            date: this.loanDate,
                            // @ts-ignore
                            amount: this.loanAmount,
                            // @ts-ignore
                            duration: result.loanData[0].loanData.loanDuration,
                            // @ts-ignore
                            type: this.loanType,
                            // @ts-ignore
                            pending: (Math.round(this.payAmount * 100) / 100).toFixed(0),
                        });
                    }
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
    }
    close(
        loanid: any,
        loanAmount: any,
        loanDate: any,
        type: string,
        bankname: string,
        chequedate: string,
        chequeno: string,
        purpose: string,
        payamount: any
    ) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                id: this.text,
                name: this.name,
                date: this.date,
                amount: loanAmount,
                loandate: loanDate,
            },
            height: '600px',
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            const closeData = [];
            if (result) {
                closeData.push({
                    userId: this.text,
                    loanId: loanid,
                    date: this.date,
                    mode: type,
                    bankName: bankname,
                    chequeDate: chequedate,
                    chequeNo: chequeno,
                    particulars: purpose,
                    amount: payamount,
                    type: 'Close Loan',
                    status: 'Fore Closure',
                    close: true,
                });
                this.loanService.sendData(closeData).subscribe(
                    resultData => {
                        Swal.fire({
                            text: 'Loan Closed!',
                            icon: 'success',
                        }).then((isConfirm: any) => {
                            if (isConfirm) {
                                this.loanData = this.loanData.filter(value => value === loanid);
                                console.log(this.loanData);
                                if (this.loanData.length === 0) {
                                    // @ts-ignore
                                    this.table = false;
                                    this.text = null;
                                    this.date = null;
                                    this.loanAmount = null;
                                    this.payAmount = 0;
                                    this.loanDate = null;
                                }
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
        });
    }
    pay(index: any) {
        this.payMode[index] = !this.payMode[index];
    }
    ngOnInit(): void {
        this.loanData = [];
    }
}
