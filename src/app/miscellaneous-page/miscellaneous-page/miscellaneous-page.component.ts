import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-miscellaneous-page',
  templateUrl: './miscellaneous-page.component.html',
  styleUrls: ['./miscellaneous-page.component.scss']
})
export class MiscellaneousPageComponent implements OnInit {

    cheque = false;
    cash = false;
    search = true;
    table = false;
    constructor() {}

    ngOnInit(): void {}

    showCheque() {
        this.cheque = true;
        this.search = false;
        this.cash = false;
    }

    showCash() {
        this.cheque = false;
        this.search = false;
        this.cash = true;
    }

    showTable() {
        this.table = true;
    }

    showSearch() {
        this.cheque = false;
        this.search = true;
        this.cash = false;
    }
}
