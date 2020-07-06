import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/upload-all/dialog/dialog.component';
import { UploadAllService } from '@app/upload-all/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sb-upload-all',
    templateUrl: './upload-all.component.html',
    styleUrls: ['./upload-all.component.scss'],
})
export class UploadAllComponent implements OnInit {
    employeeAccount = true;
    bankAccount = false;
    report = false;
    disable = true;
    check = null;
    bankForm: FormGroup;
    employeeForm: FormGroup;
    reportForm: FormGroup;
    bankList: any;
    constructor(
        private service: UploadAllService,
        private dialog: MatDialog,
        public fb: FormBuilder
    ) {
        this.employeeForm = this.fb.group({
            employeeId: new FormControl('', Validators.compose([Validators.required])),
            employeeName: new FormControl('', Validators.compose([Validators.required])),
            fatherName: new FormControl(''),
            permAddress: new FormControl(''),
            check: new FormControl(''),
            currAddress: new FormControl(''),
            email: new FormControl('', Validators.compose([Validators.email])),
            mobileNo: new FormControl(
                '',
                Validators.compose([Validators.min(1000000000), Validators.max(9999999999)])
            ),
            altMobileNo: new FormControl(
                '',
                Validators.compose([Validators.min(1000000000), Validators.max(9999999999)])
            ),
            landlineNo: new FormControl(
                '',
                Validators.compose([Validators.pattern('^[0-9]d{2,4}-d{6,8}$')])
            ),
            pan: new FormControl(
                '',
                Validators.compose([Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')])
            ),
            aadharNo: new FormControl(
                '',
                Validators.compose([Validators.pattern('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$')])
            ),
            enrollDate: new FormControl('', Validators.compose([Validators.required])),
            amount: new FormControl('', Validators.compose([Validators.required])),
            type: new FormControl('', Validators.compose([Validators.required])),
            bankName: new FormControl('', Validators.compose([Validators.required])),
            chequeDate: new FormControl('', Validators.compose([Validators.required])),
            chequeNo: new FormControl('', Validators.compose([Validators.required])),
            purpose: new FormControl('', Validators.compose([Validators.required])),
        });
        this.bankForm = this.fb.group({
            bankName: new FormControl('', Validators.compose([Validators.required])),
            bankAddress: new FormControl('', Validators.compose([Validators.required])),
            accountNo: new FormControl(
                '',
                Validators.compose([Validators.required, Validators.pattern('^\\d{9,18}$')])
            ),
            accountType: new FormControl('', Validators.compose([Validators.required])),
            nickName: new FormControl('', Validators.compose([Validators.required])),
            code: new FormControl(
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(11),
                    Validators.pattern('^[A-Z]{4}[0][A-Z0-9]{6}$'),
                ])
            ),
        });
        this.reportForm = this.fb.group({
            startDate: new FormControl('', Validators.compose([Validators.required])),
            endDate: new FormControl('', Validators.compose([Validators.required])),
            category: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    ngOnInit(): void {
        this.service.getBankList().subscribe(result => {
            this.bankList = result;
            console.log(this.bankList);
        });
    }
    send() {
        if (
            // @ts-ignore
            !this.employeeForm.get('employeeId').value ||
            // @ts-ignore
            !this.employeeForm.get('employeeName').value ||
            // @ts-ignore
            !this.employeeForm.get('enrollDate').value ||
            // @ts-ignore
            !this.employeeForm.get('amount').value ||
            // @ts-ignore
            !this.employeeForm.get('type').value ||
            // @ts-ignore
            !this.employeeForm.get('purpose').value
        ) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill Mandatory Fields!',
                icon: 'error',
            });
        } else if (
            // @ts-ignore
            this.employeeForm.get('type').value === 'Cheque' &&
            // @ts-ignore
            (!this.employeeForm.get('chequeDate').value ||
                // @ts-ignore
                !this.employeeForm.get('chequeNo').value ||
                // @ts-ignore
                !this.employeeForm.get('bankName').value
            )
        ) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill Mandatory Fields!',
                icon: 'error',
            });
        } else {
            let pass = '';
            const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
            for (let i = 1; i <= 5; i++) {
                const char = Math.floor(Math.random() * str.length + 1);
                pass += str.charAt(char);
            }
            // @ts-ignore
            const passw = pass.slice(0, 3) + this.employeeForm.get('employeeName').value.slice(0, 2) + pass.slice(3);
            const data = {
                // @ts-ignore
                userId: this.employeeForm.get('employeeId').value,
                // @ts-ignore
                name: this.employeeForm.get('employeeName').value,
                password: passw,
                // @ts-ignore
                fatherName: this.employeeForm.get('fatherName').value,
                // @ts-ignore
                permanentAddress: this.employeeForm.get('permAddress').value,
                // @ts-ignore
                currentAddress: this.employeeForm.get('currAddress').value,
                // @ts-ignore
                email: this.employeeForm.get('email').value,
                // @ts-ignore
                mobileNo1: this.employeeForm.get('mobileNo').value,
                // @ts-ignore
                mobileNo2: this.employeeForm.get('altMobileNo').value,
                // @ts-ignore
                landline: this.employeeForm.get('landlineNo').value,
                // @ts-ignore
                pan: this.employeeForm.get('pan').value,
                // @ts-ignore
                aadharNo: this.employeeForm.get('aadharNo').value,
                // @ts-ignore
                enrollmentDate: this.employeeForm.get('enrollDate').value,
                roleId: 2,
                closeAccount: false,
                // @ts-ignore
                credit: this.employeeForm.get('amount').value,
                // @ts-ignore
                mode: this.employeeForm.get('type').value,
                // @ts-ignore
                bankName: this.employeeForm.get('bankName').value,
                // @ts-ignore
                chequeDate: this.employeeForm.get('chequeDate').value,
                // @ts-ignore
                chequeNo: this.employeeForm.get('chequeNo').value,
                // @ts-ignore
                particulars: this.employeeForm.get('purpose').value,
            };
            console.log(data);
            this.service.sendData(data).subscribe(
                result => {
                    if (result) {
                        Swal.fire({
                            text: 'Account Created',
                            icon: 'success',
                        }).then((isConfirm: any) => {
                            if (isConfirm) {
                                this.employeeForm = this.fb.group({
                                    employeeId: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    employeeName: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    fatherName: new FormControl(''),
                                    permAddress: new FormControl(''),
                                    currAddress: new FormControl(''),
                                    email: new FormControl(
                                        '',
                                        Validators.compose([Validators.email])
                                    ),
                                    mobileNo: new FormControl(
                                        '',
                                        Validators.compose([Validators.minLength(10)])
                                    ),
                                    altMobileNo: new FormControl(
                                        '',
                                        Validators.compose([Validators.minLength(10)])
                                    ),
                                    landlineNo: new FormControl(
                                        '',
                                        Validators.compose([
                                            Validators.pattern('^[0-9]d{2,4}-d{6,8}$'),
                                        ])
                                    ),
                                    pan: new FormControl(
                                        '',
                                        Validators.compose([
                                            Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
                                        ])
                                    ),
                                    aadharNo: new FormControl(
                                        '',
                                        Validators.compose([
                                            Validators.pattern(
                                                '^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$'
                                            ),
                                        ])
                                    ),
                                    enrollDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    amount: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    type: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    bankName: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    chequeDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    chequeNo: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    purpose: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
    }
    showEmployeeAccountInfo() {
        this.employeeAccount = true;
        this.bankAccount = false;
        this.report = false;
    }
    showBankAccountInfo() {
        this.bankAccount = true;
        this.report = false;
        this.employeeAccount = false;
    }
    showReportInfo() {
        this.report = true;
        this.employeeAccount = false;
        this.bankAccount = false;
    }
    sameAddress(event: any) {
        console.log(event.target.checked);
        if (event.target.checked) {
            // @ts-ignore
            this.employeeForm.get('currAddress').setValue(this.employeeForm.get('permAddress').value);
        } else {
            // @ts-ignore
            this.employeeForm.get('currAddress').setValue(null);
        }
    }
    openDialog() {
        const data = {
            // @ts-ignore
            start: this.reportForm.get('startDate').value,
            // @ts-ignore
            end: this.reportForm.get('endDate').value,
            // @ts-ignore
            category: this.reportForm.get('category').value,
        };
        console.log(data);
        if (
            // @ts-ignore
            this.reportForm.get('category').value === 'Loan Disbursal Records'
        ) {
            this.service.getLoanData(data).subscribe(
                result => {
                    console.log(result);
                    if (result.loanData.length === 0) {
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Data in this range does not exists!',
                            icon: 'error',
                        });
                    } else {
                        console.log(result);
                        const dialogRef = this.dialog.open(DialogComponent, {
                            data: {
                                loan: result.loanData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            console.log(ress);
                            if (ress === '') {
                                console.log(ress);
                                this.reportForm = this.fb.group({
                                    startDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    endDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    category: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
        } else if (
            // @ts-ignore
            this.reportForm.get('category').value === 'Credit Transactions'
        ) {
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress === '') {
                                console.log(ress);
                                this.reportForm = this.fb.group({
                                    startDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    endDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    category: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
        } else if (
            // @ts-ignore
            this.reportForm.get('category').value === 'Debit Transactions'
        ) {
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress === '') {
                                console.log(ress);
                                this.reportForm = this.fb.group({
                                    startDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    endDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    category: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
        } else if (
            // @ts-ignore
            this.reportForm.get('category').value === 'Expense Deductions'
        ) {
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress === '') {
                                console.log(ress);
                                this.reportForm = this.fb.group({
                                    startDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    endDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    category: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
        } else if (
            // @ts-ignore
            this.reportForm.get('category').value === 'Credit+Debit+Expense Transactions'
        ) {
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            if (ress === '') {
                                console.log(ress);
                                this.reportForm = this.fb.group({
                                    startDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    endDate: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
                                    category: new FormControl(
                                        '',
                                        Validators.compose([Validators.required])
                                    ),
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
        } else if (
            // @ts-ignore
            this.reportForm.get('category').value === 'All Cash Transactions'
        ) {
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            this.reportForm = this.fb.group({
                                startDate: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                endDate: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                category: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                            });
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
                            data: {
                                accountData: result.accountData,
                                // @ts-ignore
                                start: this.reportForm.get('startDate').value,
                                // @ts-ignore
                                end: this.reportForm.get('endDate').value,
                                // @ts-ignore
                                category: this.reportForm.get('category').value,
                            },
                            height: '600px',
                            width: '850px',
                        });
                        dialogRef.afterClosed().subscribe(ress => {
                            this.reportForm = this.fb.group({
                                startDate: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                endDate: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                category: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                            });
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
    sendBankData() {
        const data = {
            // @ts-ignore
            bankName: this.bankForm.get('bankName').value,
            // @ts-ignore
            bankAddress: this.bankForm.get('bankAddress').value,
            // @ts-ignore
            accountNo: this.bankForm.get('accountNo').value,
            // @ts-ignore
            accountType: this.bankForm.get('accountType').value,
            // @ts-ignore
            nickname: this.bankForm.get('nickName').value,
            // @ts-ignore
            code: this.bankForm.get('code').value,
        };
        console.log(data);
        this.service.sendBankData(data).subscribe(
            result => {
                if (result) {
                    Swal.fire({
                        text: 'Account Created',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            this.bankForm = this.fb.group({
                                bankName: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                bankAddress: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                accountNo: new FormControl(
                                    '',
                                    Validators.compose([
                                        Validators.required,
                                        Validators.pattern('^\\d{9,18}$'),
                                    ])
                                ),
                                accountType: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                nickName: new FormControl(
                                    '',
                                    Validators.compose([Validators.required])
                                ),
                                code: new FormControl(
                                    '',
                                    Validators.compose([
                                        Validators.required,
                                        Validators.minLength(11),
                                        Validators.pattern('^[A-Z]{4}[0][A-Z0-9]{6}$'),
                                    ])
                                ),
                            });
                            this.service.getBankList().subscribe(ress => {
                                this.bankList = ress;
                                console.log(this.bankList);
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
}
