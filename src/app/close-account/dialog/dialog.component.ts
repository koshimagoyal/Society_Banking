import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    date = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DialogComponent>
    ) {
        if (data) {
            this.id = data.id || this.id;
            this.name = data.name || this.name;
            this.date = data.date || this.date;
            // if (data.buttonText) {
            //  this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            // }
        }
        this.dialogRef.updateSize('300vw', '300vw');
    }

    onConfirmClick(): void {
        // @ts-ignore
        const docDefinition = {
            title: 'Account Closure Letter',
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
                        ' has been cleared the account is ready to be closed. Please submit this letter with your signature.',
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
        pdfMake.createPdf(docDefinition).download('Account Closure Letter.pdf');
        this.dialogRef.close(true);
    }
}
