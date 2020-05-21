import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-loan-entry',
    templateUrl: './loan-entry.component.html',
    styleUrls: ['./loan-entry.component.scss'],
})
export class LoanEntryComponent implements OnInit {
    text: any;
    table = false;
    constructor() {}
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    send() {
        Swal.fire({
            text: 'Sent!',
            icon: 'success',
        });
    }
    ngOnInit(): void {}
}
