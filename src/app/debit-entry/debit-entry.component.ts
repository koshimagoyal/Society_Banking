import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
    selector: 'sb-debit-entry',
    templateUrl: './debit-entry.component.html',
    styleUrls: ['./debit-entry.component.scss'],
})
export class DebitEntryComponent implements OnInit {

    text: any;
    table = false;
    amt = 300000;
    constructor() {}
    send() {
        Swal.fire({
            text: 'Sent!',
            icon: 'success',
        });
    }
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    debit($event: any) {
        this.amt -= $event.target.value;
    }
    ngOnInit(): void {}
}
