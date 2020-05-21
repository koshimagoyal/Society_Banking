import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-loan-foreclosure',
  templateUrl: './loan-foreclosure.component.html',
  styleUrls: ['./loan-foreclosure.component.scss']
})
export class LoanForeclosureComponent implements OnInit {
    text: any;
    table = false;
    hide = false;
    constructor() {}
    showTable() {
        this.table = true;
        this.hide = false;
    }
    focusoutHandler($event: any) {
        this.text = $event.target.value;
    }
    close($event: any){
        this.hide = true;
    }
    ngOnInit(): void {
    }

}
