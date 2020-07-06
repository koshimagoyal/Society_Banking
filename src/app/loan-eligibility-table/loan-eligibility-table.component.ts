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
    loanType: any;
    eligibleNoLoan: any;
    personal: any;
    emergency: any;
    eligibleAmount: any;
    eligibleLoan = 0;
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
                    this.eligibleNoLoan = result.eligibleData;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.balance.length; i++) {
                        this.eligibleLoan += result.balance[i].credit - result.balance[i].debit;
                    }
                    let amt = 0;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < result.eligibleData.length; i++) {
                        if (result.eligibleData[i].loanType === 'personal')
                            this.personal = result.eligibleData[i].eligibleNoOfLoanType;
                        else
                            this.emergency = result.eligibleData[i].eligibleNoOfLoanType;
                        if (this.emergency === null) {
                            this.emergency = 'Multiple Number of Times';
                        }
                        amt = result.eligibleData[i].eligibleNoOfCorpusAmount;
                    }
                    this.eligibleAmount = amt * this.eligibleLoan;
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
                    console.log(this.loanData);
                    console.log(this.eligibleLeftAmount+' '+this.eligibleAmount);
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
