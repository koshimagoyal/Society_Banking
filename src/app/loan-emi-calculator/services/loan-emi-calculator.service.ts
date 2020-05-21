import { Injectable } from '@angular/core';

interface Script {
    name: string;
    src: string;
}
export const ScriptStore: Script = {
    name: 'calculator',
    src: 'https://emicalculator.net/widget/2.0/js/emicalc-loader.min.js',
};
@Injectable({
    providedIn: 'root',
})
export class LoanEmiCalculatorService {
    constructor() {

    }
}
