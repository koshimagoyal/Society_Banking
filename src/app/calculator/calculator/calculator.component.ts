import { Component, OnInit } from '@angular/core';
import { LoanEmiCalculatorService } from '@app/calculator/services';

@Component({
  selector: 'sb-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    constructor(private loanService: LoanEmiCalculatorService) {}
    ngOnInit(): void {
        this.loadScript('https://emicalculator.net/widget/2.0/js/emicalc-loader.min.js');
    }
    loadScript(url: string) {
        const body = document.body as HTMLDivElement;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

}
