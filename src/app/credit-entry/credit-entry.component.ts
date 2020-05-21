import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-credit-entry',
    templateUrl: './credit-entry.component.html',
    styleUrls: ['./credit-entry.component.scss'],
})
export class CreditEntryComponent implements OnInit {
    text: any;
    table = false;
    amt = 300000;
    constructor() {}
    showTable() {
        this.table = true;
    }
    send() {
        Swal.fire({
            text: 'Sent!',
            icon: 'success',
        });
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    credit($event: any) {
        this.amt += Number($event.target.value);
    }
    ngOnInit(): void {}
}
