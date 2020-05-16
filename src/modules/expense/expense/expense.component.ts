import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {
  }

}
