import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {
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
    ngOnInit(): void {}

}
