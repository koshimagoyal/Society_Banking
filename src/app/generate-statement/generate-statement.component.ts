import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '@app/generate-statement/dialog.component';
import { GenerateStatementService } from '@app/generate-statement/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-generate-statement',
    templateUrl: './generate-statement.component.html',
    styleUrls: ['./generate-statement.component.scss'],
})
export class GenerateStatementComponent implements OnInit {
    text: any;
    table = false;
    name: any;
    start: any;
    end: any;
    balance = 0;
    loanData = [];
    accountData = [];
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private generateService: GenerateStatementService
    ) {}
    showTable() {
        console.log(this.text);
        this.generateService.getData(this.text).subscribe(
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

    openDialog() {
        const data = {
            userId: this.text,
            start: this.start,
            end: this.end,
        };
        this.generateService.getDialogData(data).subscribe(
            result => {
                console.log(result);
                if (result.accountData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Data in this range does not exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result);
                    this.accountData = result.accountData;
                    this.loanData = result.loanData;
                    const dialogRef = this.dialog.open(DialogComponent, {
                        data: {
                            id: this.text,
                            name: this.name,
                            start: this.start,
                            end: this.end,
                            balance: this.balance,
                            accountData: this.accountData,
                            loanData: this.loanData,
                        },
                        height: '700px',
                        width: '650px',
                    });
                    dialogRef.afterClosed().subscribe(res => {
                        if (res) {
                            this.table = false;
                        }
                    });
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

    ngOnInit(): void {}
}
