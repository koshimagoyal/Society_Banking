import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'sb-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    id = '';
    name = '';
    date = '';
    amount = '';
    loanDate = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogComponent>
    ) {
        if (data) {
            this.id = data.id || this.id;
            this.name = data.name || this.name;
            this.date = data.date || this.date;
            this.amount = data.amount || this.amount;
            this.loanDate = data.loandate || this.loanDate;
        }
        this.dialogRef.updateSize('300vw', '300vw');
    }

    onConfirmClick(): void {
        // @ts-ignore
        const docDefinition = {
            title: 'Loan Closure Letter',
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
                    // @ts-ignore
                    text: document.getElementById('date').innerText,
                },
                { text: '\n' },
                {
                    // @ts-ignore
                    text: document.getElementById('company').innerText,
                },
                {
                    // @ts-ignore
                    text: document.getElementById('address1').innerText,
                },
                {
                    // @ts-ignore
                    text: document.getElementById('address2').innerText,
                },
                { text: '\n' },
                {
                    // @ts-ignore
                    text: document.getElementById('salutation').innerText,
                },
                { text: '\n' },
                {
                    // @ts-ignore
                    text:
                        'We would like to notify that all the dues of ' +
                        this.name +
                        ' having Employee Id as ' +
                        this.id +
                        ' has been cleared and the loan of ' +
                        this.loanDate +
                        ' with loan amount = ' +
                        this.amount +
                        ' has been closed.',
                    alignment: 'justify',
                },
                { text: '\n' },
                {
                    // @ts-ignore
                    text: document.getElementById('thank').innerText,
                },
                { text: '\n' },
                {
                    // @ts-ignore
                    text: document.getElementById('bottom1').innerText,
                },
                {
                    // @ts-ignore
                    text: document.getElementById('bottom2').innerText,
                },
                {
                    // @ts-ignore
                    text: document.getElementById('bottom3').innerText,
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
            },
        };
        // @ts-ignore
        pdfMake.createPdf(docDefinition).download('Loan Closure Letter.pdf');
        this.dialogRef.close(true);
    }
}
