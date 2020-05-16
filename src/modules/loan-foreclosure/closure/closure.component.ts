import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.scss']
})
export class ClosureComponent implements OnInit {
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
