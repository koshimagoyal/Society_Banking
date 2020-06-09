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
    loanType: any;
    loanAmount: any;
    payAmount = 0;
    loanDate: any;
    constructor(private loanService: LoanForeclosureService, private dialog: MatDialog) {}
    showTable() {
        const data = {
            userId: this.text,
            date: this.loanDate,
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
                    console.log(result);
                    this.loanAmount = result.loanData[0].loanData.loanAmount;
                    this.payAmount = this.loanAmount;
                    if (result.loanData[0].loanBook) {
                        // tslint:disable-next-line:prefer-for-of
                        for (let i = 0; i < result.loanData[0].loanBook.length; i++) {
                            const amount =
                                result.loanData[i].loanBook.EMI *
                                (result.loanData[i].loanBook.interest / 100);
                            this.payAmount -= amount;
                        }
                    }
                    this.loanType = result.loanData[0].loanData.loanType;
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
    close() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                id: this.text,
                name: this.name,
                date: this.date,
            },
            height: '600px',
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const data = {
                    date: this.date,
                    close: true,
                    userId: this.text,
                };
                this.loanService.sendData(data).subscribe(
                    resultData => {
                        Swal.fire({
                            text: 'Loan Closed!',
                            icon: 'success',
                        }).then((isConfirm: any) => {
                            if (isConfirm) {
                                // @ts-ignore
                                this.table = false;
                                this.text = null;
                                this.date = null;
                                this.loanAmount = null;
                                this.payAmount = 0;
                                this.loanDate = null;
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
    ngOnInit(): void {}
}
