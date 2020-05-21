import { Component, OnInit } from '@angular/core';
import { LoanEmiCalculatorService } from '@app/loan-emi-calculator/services';

@Component({
  selector: 'sb-loan-emi-calculator',
  templateUrl: './loan-emi-calculator.component.html',
  styleUrls: ['./loan-emi-calculator.component.scss']
})
export class LoanEmiCalculatorComponent implements OnInit {

    constructor(private loanService: LoanEmiCalculatorService) {}
    ngOnInit(): void {
        this.loadScript('https://emicalculator.net/widget/2.0/js/emicalc-loader.min.js');
    }
    loadScript(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }

}
