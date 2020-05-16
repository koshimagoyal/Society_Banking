import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
    text: any;
    table = false;
    constructor() {}
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any){
        this.text = $event.target.value;
    }

  ngOnInit(): void {
  }

}
