import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/emp-dashboard/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-emp-dashboard',
    templateUrl: './emp-dashboard.component.html',
    styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
    p: any;
    q: any;
    account: any;
    loans: any;
    term: any;
    loanTerm: any;
    show: any;
    loanAmount = 0;
    loanDebit = 0;
    emi = 0;
    balance = 0;
    amount: any;
    user: any;
    constructor(
        private dashboardService: DashboardService,
        public session: SessionStorageService
    ) {}
    ngOnInit() {
        this.user = this.session.retrieve('user');
        console.log(this.user);
        const text = this.user.id;
        console.log(text);
        this.dashboardService.getData(text).subscribe(
            result => {
                if (result) {
                    console.log(result);
                    this.show = [result.loanData.length];
                    this.q = new Array(result.loanData.length);
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.loanData.length; i++) {
                        let principle = result.loanData[i].loanData.loanAmount;
                        this.loanAmount += principle;
                        const r = result.loanData[i].loanData.interest / 100;
                        if (result.loanData[i].loanBook) {
                            // tslint:disable-next-line:prefer-for-of
                            for (let j = 0; j < result.loanData[i].loanBook.length; j++) {
                                const emi = result.loanData[i].loanBook[j].credit;
                                const amt = emi * r;
                                principle -= amt;
                                this.emi += emi;
                                console.log(principle);
                            }
                        }
                        this.loanDebit += principle;
                        console.log(this.loanDebit);
                        this.show[i] = false;
                    }
                    this.amount = (Math.round(this.loanDebit * 100) / 100).toFixed(0);
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.accountData.length; i++) {
                        this.balance +=
                            result.accountData[i].account.credit -
                            result.accountData[i].account.debit;
                    }

                    this.account = result.accountData;
                    this.loans = result.loanData;
                }
            },
            error1 => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Try again!',
                    icon: 'error',
                });
            }
        );
    }
    showTable(event: any) {
        console.log(event);
        if (this.show[event]) {
            this.show[event] = false;
        } else {
            this.show[event] = true;
        }
    }
    isDate(d: any) {
        const result = Date.parse(d);
        if (!result) return false;
        else return true;
    }
}
