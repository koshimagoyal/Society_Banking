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
    credit($event: any){
        this.amt += Number($event.target.value);
    }
  ngOnInit(): void {
  }

}
