import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '@app/generate-statement/dialog.component';
import jsPDF from 'jspdf';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'sb-generate-statement',
    templateUrl: './generate-statement.component.html',
    styleUrls: ['./generate-statement.component.scss'],
})
export class GenerateStatementComponent implements OnInit {
    text: any;
    table = false;
    name = 'Amit';
    start: any;
    end: any;
    balance = '300000';
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    /*download() {
        const content = document.getElementById('content');
        const doc = new jsPDF();
        const _elementHandlers = {
            '#editor'() {
                return true;
            },
        };
        // @ts-ignore
        doc.fromHTML(content.innerHTML, 15, 15, {
            width: 190,
            elementHandlers: _elementHandlers,
        });

        doc.save('test.pdf');
    }*/
    constructor(private dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    openDialog() {
        /*const dialogRef = this.dialog.open(DialogComponent,{
            data:{
                message: 'HelloWorld',
                buttonText: {
                    cancel: 'Done'
                }
            },
        });*/
        const dialogRef = this.dialog.open(DialogComponent,{
            data: {
                id: this.text,
                name: this.name,
                start: this.start,
                end: this.end,
                balance: this.balance,
            },
            height: '700px',
            width: '650px',
        });

        /*dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });*/
    }

    ngOnInit(): void {}
}
