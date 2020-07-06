import { Component, OnInit } from '@angular/core';
import { ApplyLoanService } from '@app/apply-loan/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'sb-apply-loan',
    templateUrl: './apply-loan.component.html',
    styleUrls: ['./apply-loan.component.scss'],
})
export class ApplyLoanComponent implements OnInit {
    text: any;
    loanAmount: any;
    duration: any;
    type: any;
    data: any;
    name: any;
    date: any;
    interest = 0;
    constructor(private loanService: ApplyLoanService, public session: SessionStorageService) {}
    ngOnInit() {
        const user = this.session.retrieve('user');
        this.text = user.id;
        this.name = user.name;
    }
    send() {
        if (!this.text || !this.loanAmount || !this.duration || !this.date || !this.type) {
            Swal.fire({
                title: 'Oops!',
                text: 'Fill All the Details!',
                icon: 'error',
            });
        } else {
            this.data = {
                userId: this.text,
                loanAmount: this.loanAmount,
                loanDuration: this.duration,
                date: this.date,
                closeLoan: true,
                loanType: this.type,
                interest: this.interest,
            };
            this.loanService.sendData(this.data).subscribe(
                result => {
                    Swal.fire({
                        text: 'Sent!',
                        icon: 'success',
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            // @ts-ignore
                            this.text = null;
                            this.date = null;
                            this.loanAmount = null;
                            this.type = null;
                            this.duration = null;
                        }
                    });
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
}
