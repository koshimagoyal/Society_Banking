import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '@app/generate-statement/dialog.component';
import { GenerateStatementService } from '@app/generate-statement/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-generate-statement',
    templateUrl: './generate-statement.component.html',
    styleUrls: ['./generate-statement.component.scss'],
})
export class GenerateStatementComponent implements OnInit {
    searchForm: FormGroup;
    text: any;
    table = false;
    name: any;
    start: any;
    end: any;
    balance = 0;
    loanData = [];
    accountData = [];
    reportForm: FormGroup;
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private generateService: GenerateStatementService,
        public fb: FormBuilder
    ) {
        this.searchForm = this.fb.group({
            employeeNo: new FormControl('', Validators.compose([Validators.required])),
        });
        this.reportForm = this.fb.group({
            start: new FormControl('', Validators.compose([Validators.required])),
            end: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    showTable() {
        // @ts-ignore
        this.text = this.searchForm.get('employeeNo').value;
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
            // @ts-ignore
            start: this.reportForm.get('start').value,
            // @ts-ignore
            end: this.reportForm.get('end').value,
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
                            // @ts-ignore
                            start: this.reportForm.get('start').value,
                            // @ts-ignore
                            end: this.reportForm.get('end').value,
                            balance: this.balance,
                            accountData: this.accountData,
                            loanData: this.loanData,
                        },
                        height: '600px',
                        width: '800px',
                    });
                    dialogRef.afterClosed().subscribe(res => {
                        if (res) {
                            this.table = false;
                            this.searchForm = this.fb.group({
                                employeeNo: new FormControl('', Validators.compose([Validators.required])),
                            });
                            this.reportForm = this.fb.group({
                                start: new FormControl('', Validators.compose([Validators.required])),
                                end: new FormControl('', Validators.compose([Validators.required])),
                            });
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
