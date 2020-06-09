import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'sb-dialog',
    templateUrl: './dialog.component.html',
})
export class DialogComponent {
    cancelButtonText = 'Cancel';
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

    onConfirmClick(): void {
        const data = document.getElementById('data');
        // @ts-ignore
        html2canvas(data).then(canvas => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('jpeg', 1);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('Bank Statement.pdf');
        });
        this.dialogRef.close(true);
    }
}
