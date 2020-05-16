import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
    text: any;
    table = false;
    amt = 300000;
    constructor() {}
    showTable() {
        this.table = true;
    }
    focusoutHandler($event: any){
        this.text = $event.target.value;
    }
    debit($event: any){
        this.amt -= $event.target.value;
    }
  ngOnInit(): void {
  }

}
