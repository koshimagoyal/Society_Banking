import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/dashboard/services';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    loanAmount = 0;
    interestAmount = 0;
    principleAmount = 0;
    noOfLoans = 0;
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
                        let principle = result.loan[i].loanData.loanAmount;
                        this.loanAmount += principle;
                        const r = result.loan[i].loanData.interest / 100;
                        if (result.loan[i].loanBook) {
                            const emi = result.loan[i].loanBook.EMI;
                            const amt = emi * r;
                            principle -= amt;
                            this.interestAmount += emi - amt;
                        }
                        this.principleAmount += principle;
                    }
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
        // tslint:disable-next-line:no-unused-expression
        return this.interestAmount, this.loanAmount;
    }
}
