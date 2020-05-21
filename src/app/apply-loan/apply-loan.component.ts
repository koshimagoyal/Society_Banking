import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'sb-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    send() {
        Swal.fire({
            text: 'Sent!',
            icon: 'success',
        });
    }

}
