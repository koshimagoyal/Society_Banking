import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
        const data = document.getElementById('data');
        // @ts-ignore
        html2canvas(data).then(canvas => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('jpeg', 0.95);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);
            pdf.save('Letter of Account Closure.pdf');
        });
        this.dialogRef.close(true);
    }
}
