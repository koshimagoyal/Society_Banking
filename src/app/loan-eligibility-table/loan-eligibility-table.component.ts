import { Component, OnInit } from '@angular/core';
import { LoanEligibleService } from '@app/loan-eligibility-table/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-loan-eligibility-table',
    templateUrl: './loan-eligibility-table.component.html',
    styleUrls: ['./loan-eligibility-table.component.scss'],
})
export class LoanEligibilityTableComponent implements OnInit {
    text: any;
    eligibleAmount: any;
    eligibleLoan: any;
    eligibleLeftAmount: any;
    eligible = true;
    loanData = [];
    constructor(public session: SessionStorageService, private loanService: LoanEligibleService) {}

    ngOnInit() {
        const user = this.session.retrieve('user');
        this.text = user.id;
        this.loanService.getData(this.text).subscribe(
            result => {
                console.log(result);
                if (result.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This user does not exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result);
                    console.log(result.body);
                    console.log(result.loanData);
                    this.eligibleAmount = result.eligibleData[0].eligibleAmount;
                    this.eligibleLoan = result.eligibleData[0].eligibleLoans;
                    const loan = result.loanData.length;
                    this.eligible = loan < this.eligibleLoan;
                    let amount = 0;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.loanData.length; i++) {
                        amount += result.loanData[i].loanAmount;
                    }
                    this.eligibleLeftAmount = this.eligibleLoan - amount;
                    if (this.eligibleLeftAmount < 0) this.eligibleLeftAmount = 0;
                    this.loanData = result.loanData;
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
        return this.eligible;
    }
}
