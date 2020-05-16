import { Component, OnInit } from '@angular/core';
import { LoanEmiCalculatorService } from '@modules/loan-emi-calculator/services';

@Component({
  selector: 'sb-loan-emi-calculator',
  templateUrl: './loan-emi-calculator.component.html',
  styleUrls: ['./loan-emi-calculator.component.scss']
})
export class LoanEmiCalculatorComponent implements OnInit {

  constructor(private loanService: LoanEmiCalculatorService) {
  }

    ngOnInit() {
        // Just call your load scripts function with scripts you want to load
        this.loadScripts();
    }

    loadScripts() {
        const dynamicScripts = [
            'https://emicalculator.net/widget/2.0/js/emicalc-loader.min.js'
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

}
