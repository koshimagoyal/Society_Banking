import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// @ts-ignore
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'sb-dialog',
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    id = '';
    name = '';
    start = '';
    end = '';
    balance = 0;
    accountData = [];
    loanData = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogComponent>
    ) {
        console.log(data);
        if (data) {
            this.id = data.id || this.id;
            this.name = data.name || this.name;
            this.start = data.start || this.start;
            this.end = data.end || this.end;
            this.balance = data.balance || this.balance;
            this.accountData = data.accountData || this.accountData;
            this.loanData = data.loanData || this.loanData;
        }
        // this.dialogRef.updateSize('300vw', '300vw');
    }
    createAccountBody(data: any[]) {
        const body: any[][] = [];
        const columns = [
            { text: 'Date', style: 'tableHeader' },
            { text: 'Particulars', style: 'tableHeader' },
            { text: 'Mode', style: 'tableHeader' },
            { text: 'Deposit', style: 'tableHeader', fillColor: '#7CFC00' },
            { text: 'Withdrawal', style: 'tableHeader', fillColor: '#DC143C' },
        ];
        body.push(columns);
        data.forEach(val => {
            if (val.account.credit === null) {
                if (this.isDate(val.account.date)) {
                    body.push([
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: '-', fillColor: '#7CFC00' },
                        { text: val.account.debit, fillColor: '#DC143C' },
                    ]);
                }
            } else {
                if (this.isDate(val.account.date)) {
                    body.push([
                        moment(val.account.date).format('DD-MM-YYYY'),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' },
                    ]);
                } else {
                    body.push([
                        val.account.date.toString(),
                        val.account.particulars.toString(),
                        val.account.mode.toString(),
                        { text: val.account.credit, fillColor: '#7CFC00' },
                        { text: '-', fillColor: '#DC143C' }
                    ]);
                }
            }
            if (val.cheque) {
                body.push([this.createChequeTable(val.cheque), {}, {}, {}, {}]);
            }
        });
        console.log(body);
        return body;
    }
    createChequeTable(data: any) {
        return {
            colSpan: 5,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['14.28%', '*', '14.28%', '*', '14.28%'],
                headerRows: 1,
                body: this.createChequeBody(data),
            },
        };
    }
    createChequeBody(data: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'Cheque Details', colSpan: 5, style: 'subheader', alignment: 'center' },
            {},
            {},
            {},
            {},
        ]);
        body.push([
            { text: 'Cheque Date', style: 'tableHeader', alignment: 'center' },
            { text: 'Bank Name', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
            { text: 'Cheque Number', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
        ]);
        data.forEach(val => {
            console.log(val);
            if (this.isDate(val.chequeDate)) {
                body.push([
                    {
                        text: moment(val.chequeDate).format('DD-MM-YYYY'),
                        alignment: 'center',
                    },
                    { text: val.bankName.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            } else {
                body.push([
                    { text: val.chequeDate.toString(), alignment: 'center' },
                    { text: val.bankName.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.chequeNo.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            }
        });

        return body;
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
        ];
        body.push(columns);
        data.forEach(val => {
            if (this.isDate(val.loanData.date)) {
                if (this.isDate(val.loanData.dateOfClosure)) {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus.toString(),
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                        ]);
                    } else {
                        body.push([
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus.toString(),
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                        ]);
                    }
                } else {
                    if (val.loanData.closeLoan === 0) {
                        body.push([
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'No',
                            val.loanData.closeStatus,
                            val.loanData.dateOfClosure,
                        ]);
                    } else {
                        body.push([
                            moment(val.loanData.date).format('DD-MM-YYYY'),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            val.loanData.dateOfClosure,
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
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
                        ]);
                    } else {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            moment(val.loanData.dateOfClosure).format('DD-MM-YYYY'),
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
                            val.loanData.dateOfClosure,
                        ]);
                    } else {
                        body.push([
                            val.loanData.date.toString(),
                            val.loanData.loanAmount.toString(),
                            val.loanData.loanDuration.toString(),
                            val.loanData.loanType.toString(),
                            'Yes',
                            val.loanData.closeStatus,
                            val.loanData.dateOfClosure,
                        ]);
                    }
                }
            }
            if (val.loanBook) {
                body.push([this.createLoanBookTable(val.loanBook), {}, {}, {}, {}, {}, {}]);
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
                ]);
            }
        });
        console.log(body);
        return body;
    }
    createLoanBookTable(data: any) {
        return {
            colSpan: 7,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['14.28%', '*', '14.28%', '*', '*', '14.28%', '*'],
                headerRows: 1,
                body: this.createLoanBookBody(data),
            },
        };
    }
    createLoanBookBody(data: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'EMI Details', colSpan: 7, style: 'subheader', alignment: 'center' },
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
            { text: 'EMI Paid', colSpan: 2, style: 'tableHeader', alignment: 'center' },
            {},
        ]);
        data.forEach(val => {
            console.log(val);
            if (this.isDate(val.date)) {
                body.push([
                    {
                        text: moment(val.date).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: val.particulars.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.credit.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            } else {
                body.push([
                    { text: val.date.toString(), colSpan: 2, alignment: 'center' },
                    {},
                    { text: val.particulars.toString(), colSpan: 3, alignment: 'center' },
                    {},
                    {},
                    { text: val.credit.toString(), colSpan: 2, alignment: 'center' },
                    {},
                ]);
            }
        });

        return body;
    }
    createCloseTable(data: any, loanData: any, chequeData: any) {
        return {
            colSpan: 7,
            alignment: 'center',
            style: 'nestedTable',
            table: {
                widths: ['14.28%', '*', '*', '*', '*', '*', '*'],
                headerRows: 1,
                body: this.createCloseBody(data, loanData, chequeData),
            },
        };
    }
    createCloseBody(data: any[], loanData: any, chequeData: any[]) {
        const body: any[][] = [];
        body.push([
            { text: 'Loan Closure Details', colSpan: 7, style: 'subheader', alignment: 'center' },
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
                { text: 'Mode of Payment', style: 'tableHeader', alignment: 'center' },
                { text: 'Paid Amount', colSpan: 2, style: 'tableHeader', alignment: 'center' },
                {},
            ]);
            if (this.isDate(data[0].date)) {
                body.push([
                    {
                        text: moment(data[0].date).format('DD-MM-YYYY'),
                        colSpan: 2,
                        alignment: 'center',
                    },
                    {},
                    { text: loanData.closeStatus, colSpan: 2, alignment: 'center' },
                    {},
                    { text: data[0].mode.toString(), alignment: 'center' },
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
                    { text: data[0].mode.toString(), alignment: 'center' },
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
                { text: 'Cheque Number', style: 'tableHeader', alignment: 'center' },
            ]);
            if (this.isDate(data[0].date)) {
                if (this.isDate(chequeData[0].chequeDate)) {
                    body.push([
                        {
                            text: moment(data[0].date).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: loanData.closeStatus, alignment: 'center' },
                        { text: data[0].mode.toString(), alignment: 'center' },
                        { text: data[0].credit.toString(), alignment: 'center' },
                        {
                            text: moment(chequeData[0].chequeDate).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        { text: chequeData[0].chequeNo.toString(), alignment: 'center' },
                    ]);
                } else {
                    body.push([
                        {
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
                        { text: chequeData[0].chequeNo.toString(), alignment: 'center' },
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
                            text: moment(chequeData[0].chequeDate).format('DD-MM-YYYY'),
                            alignment: 'center',
                        },
                        { text: chequeData[0].bankName.toString(), alignment: 'center' },
                        { text: chequeData[0].chequeNo.toString(), alignment: 'center' },
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
                        { text: chequeData[0].chequeNo.toString(), alignment: 'center' },
                    ]);
                }
            }

            return body;
        }
    }
    onConfirmClick(): void {
        // @ts-ignore
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [20, 20, 20, 30],
            content: [
                {
                    // @ts-ignore
                    text: document.getElementById('title').innerText,
                    style: 'header',
                    alignment: 'center',
                },
                { text: '\n' },
                { text: '\n' },
                {
                    style: 'tableExample',
                    table: {
                        widths: ['15%', '*', '*', '*', '*', '25%', '*'],
                        body: [
                            [
                                {
                                    text: 'Employee Id',
                                    style: 'tableHeader',
                                    alignment: 'right ',
                                },
                                this.id,
                                {},
                                {},
                                {},
                                {
                                    text: 'Employee Name',
                                    style: 'tableHeader',
                                    alignment: 'right',
                                },
                                this.name,
                            ],
                        ],
                    },
                    layout: 'noBorders',
                    alignment: 'center',
                },
                { text: '\n' },
                {
                    style: 'tableExample',
                    table: {
                        alignment: 'center',
                        widths: ['30%', '30%'],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: 'Particulars',
                                    style: 'tableHeader',
                                },
                                {
                                    text: 'Value',
                                    style: 'tableHeader',
                                },
                            ],
                            [
                                {
                                    text: 'Start Date',
                                },
                                // @ts-ignore
                                document.getElementById('start').innerHTML,
                            ],
                            [
                                {
                                    text: 'End Date',
                                },
                                // @ts-ignore
                                document.getElementById('end').innerHTML,
                            ],
                            [
                                {
                                    text: 'Balance',
                                },
                                // @ts-ignore
                                document.getElementById('bal').innerHTML,
                            ],
                        ],
                    },
                },
                { text: '\n' },
                // @ts-ignore
                { text: document.getElementById('subDetail1').innerText, style: 'subheader' },
                {
                    style: 'tableExample',
                    table: {
                        widths: ['16.66%', '50%', '*', '*', '*'],
                        headerRows: 1,
                        body: this.createAccountBody(this.accountData),
                    },
                },
                // @ts-ignore
                { text: document.getElementById('subDetail2').innerText, style: 'subheader' },
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*', '*', '*', '*', '*', '*', '*'],
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
        };
        // @ts-ignore
        pdfMake.createPdf(docDefinition).download('Bank Statement.pdf');
        this.dialogRef.close(true);
    }
    isDate(d: any) {
        const result = Date.parse(d);
        if (!result) return false;
        else return true;
    }
}
