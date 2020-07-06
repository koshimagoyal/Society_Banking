import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'sb-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
    start = '';
    end = '';
    accountData = [];
    loanData = [];
    category = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogComponent>
    ) {
        console.log(data);
        if (data) {
            this.accountData = data.accountData || this.accountData;
            this.loanData = data.loan || this.loanData;
            this.category = data.category || this.category;
            this.start = data.start || this.start;
            this.end = data.end || this.end;
        }
    }
    createLoanBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Loan Date', style: 'tableHeader' },
            { text: 'Loan Amount', style: 'tableHeader' },
            { text: 'Loan Duration', style: 'tableHeader' },
            { text: 'Loan Type', style: 'tableHeader' },
            { text: 'Close Loan', style: 'tableHeader' },
            { text: 'Closure Status', style: 'tableHeader' },
            { text: 'Date of Loan Closure', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.loanData.date)) {
                if (this.isDate(val.loanData.dateOfClosure)) {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            // @ts-ignore
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus.toString(),
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    } else {
                        body.push([
                            // @ts-ignore
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus.toString(),
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    }
                } else {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            // @ts-ignore
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus,
                            val.loanData.dateOfClosure,
                            val.loanData.userId,
                        ]);
                    } else {
                        body.push([
                            // @ts-ignore
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            val.loanData.dateOfClosure,
                            val.loanData.userId,
                        ]);
                    }
                }
            } else {
                if (this.isDate(val.loanData.dateOfClosure)) {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus,
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    } else {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    }
                } else {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus,
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    } else {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            // @ts-ignore
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                            val.loanData.userId,
                        ]);
                    }
                    body.push([
                        val.loanData.date.toString(),
                        val.loanData.loanAmount.toString(),
                        val.loanData.loanDuration.toString(),
                        val.loanData.loanType.toString(),
                        val.loanData.closeLoan.toString(),
                        val.loanData.closeStatus,
                        val.loanData.dateOfClosure,
                        val.loanData.userId,
                    ]);
                }
            }
            if (val.loanBook) {
                body.push([this.createLoanBookTable(val.loanBook), {}, {}, {}, {}, {}, {}, {}]);
            }
            if (val.closeData) {
                body.push([
                    this.createCloseTable(val.closeData, val.loanData, val.chequeData),
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ]);
            }
        });
        console.log(body);
        return body;
    }
    createLoanBookTable(data: any) {
        return {
            colSpan: 8,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                headerRows: 1,
                body: this.createLoanBookBody(data),
            },
        };
    }
    createLoanBookBody(data: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'EMI Details', colSpan: 8, style: 'subheader', alignment: 'center' },
            {},
            {},
            {},
            {},
            {},
            {},
        ]);
        body.push([
            { text: 'EMI Date', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
            { text: 'Particulars', colSpan: 3, style: 'tableHeader', alignment: 'center' },
            {},
            {},
            { text: 'EMI Paid', colSpan: 3, style: 'tableHeader', alignment: 'center' },
            {},
            {},
        ]);
        data.forEach(val => {
            console.log(val);
            if (this.isDate(val.date)) {
                body.push([
                    {
                        // @ts-ignore
                        text: moment(val.date).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: val.particulars.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.credit.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                ]);
            } else {
                body.push([
                    { text: val.date.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.particulars.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.credit.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                ]);
            }
        });

        return body;
    }
    createCloseTable(data: any, loanData: any, chequeData: any) {
        return {
            colSpan: 8,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['14.66%', 'auto', '*', '*', '*', '*', '*', 'auto'],
                headerRows: 1,
                body: this.createCloseBody(data, loanData, chequeData),
            },
        };
    }
    createCloseBody(data: any[], loanData: any, chequeData: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'Loan Closure Details', colSpan: 8, style: 'subheader', alignment: 'center' },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]);
        if (data[0].mode === 'Cash') {
            body.push([
                { text: 'Date', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Loan Status', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Mode of Payment', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Paid Amount', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
            ]);
            if (this.isDate(data[0].date)) {
                body.push([
                    {
                        // @ts-ignore
                        text: moment(data[0].date).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: loanData.closeStatus, colSpan: 2, alignment: 'center' },
                    {},
                    { text: data[0].mode.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: data[0].credit.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            } else {
                body.push([
                    {
                        text: data[0].date.toString(),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: loanData.closeStatus, colSpan: 2, alignment: 'center' },
                    {},
                    { text: data[0].mode.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: data[0].credit.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            }

            return body;
        } else {
            body.push([
                { text: 'Date', style: 'tableHeader', alignment: 'center' },
                { text: 'Loan Status', style: 'tableHeader', alignment: 'center' },
                { text: 'Mode of Payment', style: 'tableHeader', alignment: 'center' },
                { text: 'Paid Amount', style: 'tableHeader', alignment: 'center' },
                { text: 'Cheque Date', style: 'tableHeader', alignment: 'center' },
                { text: 'Bank Name', style: 'tableHeader', alignment: 'center' },
                { text: 'Cheque Number', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
            ]);
            if (this.isDate(data[0].date)) {
                if (this.isDate(chequeData[0].chequeDate)) {
                    body.push([
                        {
                            // @ts-ignore
                            text: moment(data[0].date).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: loanData.closeStatus, alignment: 'center' },
                        { text: data[0].mode.toString(), alignment: 'center' },
                        { text: data[0].credit.toString(), alignment: 'center' },
                        {
                            // @ts-ignore
                            text: moment(chequeData[0].chequeDate).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeNo.toString(),
                            colSpan: 2,
                            alignment: 'center',
                        },
                        {},
                    ]);
                } else {
                    body.push([
                        {
                            // @ts-ignore
                            text: moment(data[0].date).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: loanData.closeStatus, alignment: 'center' },
                        { text: data[0].mode.toString(), alignment: 'center' },
                        { text: data[0].credit.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeDate,
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeNo.toString(),
                            colSpan: 2,
                            alignment: 'center',
                        },
                        {},
                    ]);
                }
            } else {
                if (this.isDate(chequeData[0].chequeDate)) {
                    body.push([
                        {
                            text: data[0].date,
                            alignment: 'center',
                        },
                        { text: loanData.closeStatus, alignment: 'center' },
                        { text: data[0].mode.toString(), alignment: 'center' },
                        { text: data[0].credit.toString(), alignment: 'center' },
                        {
                            // @ts-ignore
                            text: moment(chequeData[0].chequeDate).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeNo.toString(),
                            colSpan: 2,
                            alignment: 'center',
                        },
                        {},
                    ]);
                } else {
                    body.push([
                        {
                            text: data[0].date,
                            alignment: 'center',
                        },
                        { text: loanData.closeStatus, alignment: 'center' },
                        { text: data[0].mode.toString(), alignment: 'center' },
                        { text: data[0].credit.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeDate,
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        {
                            text: chequeData[0].chequeNo.toString(),
                            colSpan: 2,
                            alignment: 'center',
                        },
                        {},
                    ]);
                }
            }

            return body;
        }
    }
    createCashBody(data: any[]) {
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Credit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Debit', style: 'tableHeader', fillColor: '#DC143C' },
            { text: 'Type', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        const body: any[][] = [];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.date)) {
                if (val.credit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.date).format('DD-MM-YYYY'),
                        val.particulars.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.debit, fillColor: '#DC143C' },
                        val.type,
                        val.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.date).format('DD-MM-YYYY'),
                        val.particulars.toString(),
                        { text: val.credit.toString(), fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.type,
                        val.userId.toString(),
                    ]);
                }
            } else {
                if (val.credit === null) {
                    body.push([
                        val.date,
                        val.particulars.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.debit, fillColor: '#DC143C' },
                        val.type,
                        val.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.date.toString(),
                        val.particulars.toString(),
                        { text: val.credit.toString(), fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.type,
                        val.userId.toString(),
                    ]);
                }
            }
        });
        console.log(body);
        return body;
    }
    createChequeTranBody(data: any[]) {
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Credit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Debit', style: 'tableHeader', fillColor: '#DC143C' },
            { text: 'Type', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        const body: any[][] = [];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.account.date)) {
                if (val.account.credit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            } else {
                if (val.account.credit === null) {
                    body.push([
                        val.account.date,
                        val.account.particulars.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createChequeTable(val.cheque), {}, {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createCreditBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Mode', style: 'tableHeader' },
            { text: 'Credit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Type', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.account.date)) {
                if (val.account.credit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: '-', fillColor: '#7CFC00' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: val.account.credit.toString(), fillColor: '#7CFC00' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            } else {
                if (val.account.credit === null) {
                    body.push([
                        val.account.date,
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: '-', fillColor: '#7CFC00' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: val.account.credit.toString(), fillColor: '#7CFC00' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createChequeTable(val.cheque), {}, {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createDebitBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Mode', style: 'tableHeader' },
            { text: 'Debit', style: 'tableHeader', fillColor: '#DC143C' },
            { text: 'Type', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.account.date)) {
                if (val.account.debit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.debit.toString(), fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            } else {
                if (val.account.debit === null) {
                    body.push([
                        val.account.date,
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.debit.toString(), fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createChequeTable(val.cheque), {}, {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Mode', style: 'tableHeader' },
            { text: 'Credit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Debit', style: 'tableHeader', fillColor: '#DC143C' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.account.date)) {
                if (val.account.credit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.userId.toString(),
                    ]);
                }
            } else {
                if (val.account.credit === null) {
                    body.push([
                        val.account.date,
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.userId.toString(),
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createChequeTable(val.cheque), {}, {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createChequeTable(data: any) {
        return {
            colSpan: 6,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['16.66%', '*', '16.66%', '*', '16.66%', '*'],
                headerRows: 1,
                body: this.createChequeBody(data),
            },
        };
    }
    createChequeBody(data: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'Cheque Details', colSpan: 6, style: 'subheader', alignment: 'center' },
            {},
            {},
            {},
            {},
            {},
        ]);
        body.push([
            { text: 'Cheque Date', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
            { text: 'Bank Name', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
            { text: 'Cheque Number', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
        ]);
        data.forEach(val => {
            if (this.isDate(val.chequeDate)) {
                body.push([
                    {
                        // @ts-ignore
                        text: moment(val.chequeDate.toString()).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: val.bankName.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            } else {
                body.push([
                    { text: val.chequeDate.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.bankName.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            }
        });

        return body;
    }
    createCDEBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Mode', style: 'tableHeader' },
            { text: 'Credit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Debit', style: 'tableHeader', fillColor: '#DC143C' },
            { text: 'Type', style: 'tableHeader' },
            { text: 'User Id', style: 'tableHeader' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.account.date)) {
                if (val.account.credit === null) {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        // @ts-ignore
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            } else {
                if (val.account.credit === null) {
                    body.push([
                        val.account.date,
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode,
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                        val.account.type,
                        val.account.userId.toString(),
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createCDEChequeTable(val.cheque), {}, {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createCDEChequeTable(data: any) {
        return {
            colSpan: 7,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['14.66%', '*', '14.66%', '*', '*', '14.66%', '*'],
                headerRows: 1,
                body: this.createCDEChequeBody(data),
            },
        };
    }
    createCDEChequeBody(data: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'Cheque Details', colSpan: 7, style: 'subheader', alignment: 'center' },
            {},
            {},
            {},
            {},
            {},
            {},
        ]);
        body.push([
            { text: 'Cheque Date', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
            { text: 'Bank Name', colSpan: 3, style: 'tableHeader', alignment: 'center' },
            {},
            {},
            { text: 'Cheque Number', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
        ]);
        data.forEach(val => {
            if (this.isDate(val.chequeDate)) {
                body.push([
                    {
                        // @ts-ignore
                        text: moment(val.chequeDate.toString()).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: val.bankName.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            } else {
                body.push([
                    { text: val.chequeDate.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.bankName.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            }
        });

        return body;
    }
    onConfirmClick(): void {
        if (this.category === 'Loan Disbursal Records') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: 'Loan Details', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['10%', '*', '*', '*', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createLoanBody(this.loanData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Loan Disbursal Records.pdf');
        } else if (this.category === 'All Cash Transactions') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: 'Cash Transactions', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['14%', '50%', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createCashBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Cash Transactions.pdf');
        } else if (this.category === 'All Cheque Transactions') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: '\n' },
                    { text: 'Cheque Transactions', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['14%', '50%', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createChequeTranBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Cheque Transactions.pdf');
        } else if (this.category === 'Credit Transactions') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: 'Credit Transactions', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '50%', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createCreditBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Credit Transactions.pdf');
        } else if (this.category === 'Debit Transactions') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: 'Debit Transactions', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '50%', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createDebitBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Debit Transactions.pdf');
        } else if (this.category === 'Expense Deductions') {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    // @ts-ignore
                    { text: document.getElementById('subDetail').innerText, style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['16.66%', '50%', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Expense Deduction Report.pdf');
        } else {
            // @ts-ignore
            const docDefinition = {
                pageSize: 'A4',
                pageOrientation: 'landscape',
                pageMargins: [20, 20, 20, 30],
                content: [
                    { text: this.category, style: 'header', alignment: 'center' },
                    { text: '\n' },
                    { text: '\n' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['12%', '*', '*', '*', '*', '*', '*', '*', '*', '*', '15%'],
                            body: [
                                [
                                    {
                                        text: 'Start Date',
                                        style: 'tableHeader',
                                        alignment: 'right ',
                                    },
                                    // @ts-ignore
                                    document.getElementById('start').innerHTML,
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {},
                                    {
                                        text: 'End Date',
                                        style: 'tableHeader',
                                        alignment: 'right',
                                    },
                                    // @ts-ignore
                                    document.getElementById('end').innerHTML,
                                ],
                            ],
                        },
                        layout: 'noBorders',
                        alignment: 'center',
                    },
                    { text: '\n' },
                    { text: 'Credit + Debit + Expense Transactions', style: 'subheader' },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '50%', '*', '*', '*', '*', '*'],
                            headerRows: 1,
                            body: this.createCDEBody(this.accountData),
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                    subheader: {
                        fontSize: 16,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    tableExample: {
                        margin: [0, 15, 0, 15],
                    },
                    nestedTable: {
                        margin: [5, 5, 5, 5],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black',
                    },
                },
                defaultStyle: {
                    alignment: 'justify',
                },
            };
            // @ts-ignore
            pdfMake.createPdf(docDefinition).download('Credit+Debit+Expense Transactions.pdf');
        }
        this.dialogRef.close(true);
    }
    isDate(d: any) {
        const result = Date.parse(d);
        if (!result) return false;
        else return true;
    }
}
