import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/upload-all/dialog/dialog.component';
import { UploadAllService } from '@app/upload-all/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-upload-all',
    templateUrl: './upload-all.component.html',
    styleUrls: ['./upload-all.component.scss'],
})
export class UploadAllComponent implements OnInit {
    employeeAccount = true;
    report = false;
    check = null;
    employeeId: any;
    employeeName: any;
    fatherName: any;
    permAddress: any;
    currAddress: any;
    email: any;
    mobileNo: any;
    altMobileNo: any;
    landlineNo: any;
    pan: any;
    aadharNo: any;
    amount: any;
    enrollDate: any;
    type: any;
    bankName: any;
    chequeDate: any;
    chequeNo: any;
    purpose: any;
    startDate: any;
    endDate: any;
    category: any;
    constructor(private service: UploadAllService, private dialog: MatDialog) {}

    ngOnInit(): void {}
    send() {
        if (!this.employeeId || !this.employeeName) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill Employee Id and Employee Name.',
                icon: 'error',
            });
        } else {
            let pass = '';
            const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
            for (let i = 1; i <= 5; i++) {
                const char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }
            const passw = pass.slice(0, 3) + this.employeeName.slice(0, 2) + pass.slice(3);
            const data = {
                userId: this.employeeId,
                name: this.employeeName,
                password: passw,
                fatherName: this.fatherName,
                permanentAddress: this.permAddress,
                currentAddress: this.currAddress,
                email: this.email,
                mobileNo1: this.mobileNo,
                mobileNo2: this.altMobileNo,
                landline: this.landlineNo,
                pan: this.pan,
                aadharNo: this.aadharNo,
                enrollmentDate: this.enrollDate,
                roleId: 2,
                closeAccount: false,
                credit: this.amount,
                mode: this.type,
                bankName: this.bankName,
                chequeDate: this.chequeDate,
                chequeNo: this.chequeNo,
                particulars: this.purpose,
            };
            this.service.sendData(data).subscribe(
                result => {
                    if (result) {
                        Swal.fire({
                            text: 'Account Created',
                            icon: 'success',
                        }).then((isConfirm: any) => {
                            if (isConfirm) {
                                this.check = null;
                                this.employeeId = null;
                                this.employeeName = null;
                                this.fatherName = null;
                                this.permAddress = null;
                                this.currAddress = null;
                                this.email = null;
                                this.mobileNo = null;
                                this.altMobileNo = null;
                                this.landlineNo = null;
                                this.pan = null;
                                this.aadharNo = null;
                                this.amount = null;
                                this.enrollDate = null;
                                this.type = null;
                                this.bankName = null;
                                this.chequeDate = null;
                                this.chequeNo = null;
                                this.purpose = null;
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
    }
    showEmployeeAccountInfo() {
        this.employeeAccount = true;
    }
    showReportInfo() {
        this.report = !this.report;
    }
    sameAddress(event: any) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.currAddress = this.permAddress;
        } else {
            this.currAddress = null;
        }
    }
    openDialog() {
        const data = {
            start: this.startDate,
            end: this.endDate,
            category: this.category,
        };
        console.log(data);
        if (this.category === 'Loan Disbursal Record') {
            this.service.getLoanData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else if (this.category === 'Credit Transactions') {
            this.service.getCreditData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else if (this.category === 'Debit Transactions') {
            this.service.getDebitData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else if (this.category === 'Expense Deductions') {
            this.service.getExpenseData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else if (this.category === 'Credit+Debit+Expense Transactions') {
            this.service.getCreditDebitExpenseData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else if (this.category === 'All Cash Transactions') {
            this.service.getCashData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
        } else {
            this.service.getChequeData(data).subscribe(
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
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {},
                            height: '600px',
                            width: '800px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress) {
                                console.log(ress);
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
    }
}
