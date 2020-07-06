import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '@app/close-account/dialog/dialog.component';
import { CloseAccountService } from '@app/close-account/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-close-account',
    templateUrl: './close-account.component.html',
    styleUrls: ['./close-account.component.scss'],
})
export class CloseAccountComponent implements OnInit {
    searchForm: FormGroup;
    text: any;
    table = false;
    loanClose = false;
    hide = false;
    disable = true;
    name: any;
    date: any;
    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private closeAccount: CloseAccountService,
        public fb: FormBuilder
    ) {
        this.searchForm = this.fb.group({
            employeeNo: new FormControl('', Validators.compose([Validators.required])),
        });
    }
    showTable() {
        // @ts-ignore
        this.text = this.searchForm.get('employeeNo').value;
        console.log(this.text);
        this.closeAccount.getData(this.text).subscribe(
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
                    this.name = result.nameData[0].name;
                    this.loanClose = result.loanData.length === 0;
                    this.hide = this.loanClose;
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
        return this.loanClose;
    }
    close() {
        const data = {
            date: this.date,
            close: true,
            userId: this.text,
        };
        this.closeAccount.sendData(data).subscribe(
            resultData => {
                Swal.fire({
                    text: 'Sent!',
                    icon: 'success',
                }).then((isConfirm: any) => {
                    if (isConfirm) {
                        // @ts-ignore
                        this.table = false;
                        this.text = null;
                        this.date = null;
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
    openDialog(event: any) {
        if (event.target.checked) {
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
                    this.disable = !this.disable;
                } else {
                    event.target.checked = false;
                }
            });
        }
    }
    ngOnInit(): void {}
}
