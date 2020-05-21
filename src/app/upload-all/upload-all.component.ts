import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'sb-upload-all',
  templateUrl: './upload-all.component.html',
  styleUrls: ['./upload-all.component.scss']
})
export class UploadAllComponent implements OnInit {

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
