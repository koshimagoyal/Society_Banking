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
    interestAmt: any;
    term: any;
    loanApprove = false;
    loanData = [];
    balance: any;
    p: any;
    approveMode: any;
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
                        const r = result.loan[i].loanData.interest / 1200;
                        if (result.loan[i].loanBook) {
                            // tslint:disable-next-line:prefer-for-of
                            for (let j = 0; j < result.loan[i].loanBook.length; j++) {
                                const emi = result.loan[i].loanBook[j].credit;
                                const interest = principle * r;
                                const amt = emi - interest;
                                this.principleAmount += amt;
                                this.interestAmount += interest;
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
        this.dashboardService.getLoanData().subscribe(
            result => {
                if (result) {
                    console.log(result);
                    console.log(result.data.length);
                    if(result.data.length !== 0){
                        this.approveMode = new Array(result.data.length);
                        this.interestAmt = new Array(result.data.length);
                        this.loanData = result.data;
                        this.loanApprove = true;
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
        this.dashboardService.getBal().subscribe(
            result => {
                if (result) {
                    console.log(result);
                    this.balance = result;
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
    approve(index: any) {
        this.approveMode[index] = !this.approveMode[index];
    }
    approveLoan(text: any, id: any, loanInterest: any) {
        const data = {
            userId: text,
            loanId: id,
            interest: loanInterest,
            closeLoan: false,
        };
        console.log(data);
        this.dashboardService.approveLoan(data).subscribe(
            result => {
                if (result) {
                    Swal.fire({
                        text: 'Approved!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            window.location.reload();
                        }
                    });
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
    rejectLoan(text: any, id: any) {
        const data = {
            userId: text,
            loanId: id,
        };
        console.log(data);
        this.dashboardService.rejectLoan(data).subscribe(
            result => {
                if (result) {
                    Swal.fire({
                        text: 'Rejected!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            window.location.reload();
                        }
                    });
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
