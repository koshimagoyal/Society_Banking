import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/dashboard/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    loanAmount = 0;
    interestAmount = 0;
    principleAmount = 0;
    noOfLoans = 0;
    amount: any;
    interest: any;
    constructor(private dashboardService: DashboardService) {}
    ngOnInit() {
        this.dashboardService.getData().subscribe(
            result => {
                if (result) {
                    console.log(result);
                    console.log(result.loan.length);
                    this.noOfLoans = result.loan.length;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.loan.length; i++) {
                        const principle = result.loan[i].loanData.loanAmount;
                        this.loanAmount += principle;
                        const r = result.loan[i].loanData.interest / 100;
                        if (result.loan[i].loanBook) {
                            // tslint:disable-next-line:prefer-for-of
                            for (let j = 0; j < result.loan[i].loanBook.length; j++) {
                                const emi = result.loan[i].loanBook[j].credit;
                                const amt = emi * r;
                                this.principleAmount += amt;
                                this.interestAmount += emi - amt;
                            }
                        }
                    }
                    this.amount = (Math.round(this.principleAmount * 100) / 100).toFixed(0);
                    this.interest = (Math.round(this.interestAmount * 100) / 100).toFixed(0);
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
}
