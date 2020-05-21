import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-fy-dividend-calculate',
  templateUrl: './fy-dividend-calculate.component.html',
  styleUrls: ['./fy-dividend-calculate.component.scss']
})
export class FyDividendCalculateComponent implements OnInit {

    disable = false;
  constructor() { }

  ngOnInit(): void {
  }

  disableFields(){
      if(this.disable)
          this.disable = false;
      else
          this.disable = true;
  }

}
