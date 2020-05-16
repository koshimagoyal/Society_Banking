import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-tables.component.html',
    styleUrls: ['dashboard-tables.component.scss'],
})
export class DashboardTablesComponent implements OnInit {
    countries = [
        {
            id: 1,
            date: '12-02-2018',
            particulars: 'abc',
            withdrawal: 2000,
            deposit: 9754,
            balance: 1237894,
        },
        {
            id: 2,
            date: '06-04-2018',
            particulars: 'hgvhg',
            withdrawal: 2560,
            deposit: 974,
            balance: 1237894,
        },
        {
            id: 3,
            date: '23-04-2018',
            particulars: 'hgjhgh',
            withdrawal: 3060,
            deposit: 10754,
            balance: 1237894,
        },
        {
            id: 4,
            date: '12-06-2018',
            particulars: 'abc',
            withdrawal: 2000,
            deposit: 9754,
            balance: 1237894,
        },
        {
            id: 5,
            date: '27-02-2019',
            particulars: 'bhg',
            withdrawal: 5000,
            deposit: 9754,
            balance: 1237894,
        },
    ];
    loans = [
        {
            id: 1,
            date: '12-02-2018',
            particulars: 'abc',
            debit: 2000,
            deposit: 9754,
            balance: 1237894,
            emi: 1300,
        },
        {
            id: 2,
            date: '06-04-2018',
            particulars: 'hgvhg',
            debit: 2560,
            deposit: 974,
            balance: 1237894,
            emi: 400,
        },
        {
            id: 3,
            date: '23-04-2018',
            particulars: 'hgjhgh',
            debit: 3060,
            deposit: 10754,
            balance: 1237894,
            emi: 3000,
        },
        {
            id: 4,
            date: '12-06-2018',
            particulars: 'abc',
            debit: 2000,
            deposit: 9754,
            balance: 1237894,
            emi: 700,
        },
        {
            id: 5,
            date: '27-02-2019',
            particulars: 'bhg',
            debit: 5000,
            deposit: 9754,
            balance: 1237894,
            emi: 4560,
        },
    ];
    term: any;
    loanTerm: any;
    constructor() {}
    ngOnInit() {}
}
