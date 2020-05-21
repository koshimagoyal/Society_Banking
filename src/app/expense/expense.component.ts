import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'sb-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
    amt = 300000;
    constructor() { }
    debit($event: any){
        this.amt -= $event.target.value;
    }
    send() {
        Swal.fire({
            text: 'Sent!',
            icon: 'success',
        });
    }
    ngOnInit(): void {}
}
