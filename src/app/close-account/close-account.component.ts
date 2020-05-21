import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '@app/close-account/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'sb-close-account',
    templateUrl: './close-account.component.html',
    styleUrls: ['./close-account.component.scss'],
})
export class CloseAccountComponent implements OnInit {
    text: any;
    table = false;
    hide = false;
    disable = true;
    name = 'Amit';
    date: any;
    constructor(private dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }
    showTable() {
        this.table = true;
        this.hide = false;
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    close($event: any) {
        this.hide = true;
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
                date: this.date,
            },
            height: '700px',
            width: '700px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if(this.disable)
                this.disable = false;
            else
                this.disable = true;
        });
    }
    ngOnInit(): void {}
}
