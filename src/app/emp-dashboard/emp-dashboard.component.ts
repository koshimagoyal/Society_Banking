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
    constructor(
        private dashboardService: DashboardService,
        public session: SessionStorageService
    ) {}
    ngOnInit() {
        const user = this.session.retrieve('user');
        console.log(user);
        const text = user.id;
        console.log(text);
        this.dashboardService.getData(text).subscribe(
            result => {
                if (result) {
                    console.log(result);
                    this.show = [result.loanData.length];
                    // this.loanTerm = [result.loanData.length];
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.loanData.length; i++) {
                        let principle = result.loanData[i].loanData.loanAmount;
                        this.loanAmount += principle;
                        const r = result.loanData[i].loanData.interest / 100;
                        if (result.loanData[i].loanBook) {
                            const emi = result.loanData[i].loanBook.EMI;
                            const amt = emi * r;
                            principle -= amt;
                            this.emi += emi;
                        }
                        this.loanDebit += principle;
                        this.show[i] = false;
                    }
                    this.amount = (Math.round(this.loanDebit * 100) / 100).toFixed(2);
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.accountData.length; i++) {
                        this.balance += result.accountData[i].credit - result.accountData[i].debit;
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
}
