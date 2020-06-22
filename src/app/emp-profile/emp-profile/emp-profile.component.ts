import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@app/emp-profile/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-emp-profile',
    templateUrl: './emp-profile.component.html',
    styleUrls: ['./emp-profile.component.scss'],
})
export class EmpProfileComponent implements OnInit {
    employeeId: any;
    employeeName: any;
    fatherName: any;
    permAddress: any;
    currAddress: any;
    check: any;
    email: any;
    mobileNo: any;
    altMobileNo: any;
    landlineNo: any;
    pan: any;
    aadharNo: any;
    enrollDate: any;
    constructor(public service: ProfileService, public session: SessionStorageService) {}

    ngOnInit(): void {
        const user = this.session.retrieve('user');
        this.employeeId = user.id;
        this.service.getData(this.employeeId).subscribe(
            result => {
                if (result.nameData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This user does not exists!',
                        icon: 'error',
                    });
                } else {
                    console.log(result);
                    this.employeeName = result.nameData[0].name;
                    this.fatherName = result.nameData[0].fatherName;
                    this.permAddress = result.nameData[0].permanentAddress;
                    this.currAddress = result.nameData[0].currentAddress;
                    this.email = result.nameData[0].email;
                    this.mobileNo = result.nameData[0].mobileNo1;
                    this.altMobileNo = result.nameData[0].mobileNo2;
                    this.landlineNo = result.nameData[0].landline;
                    this.pan = result.nameData[0].pan;
                    this.aadharNo = result.nameData[0].adharNo;
                    this.enrollDate = result.nameData[0].enrollmentDate;
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
    sameAddress(event: any) {
        console.log(event.target.checked);
        if (event.target.checked) {
            this.currAddress = this.permAddress;
        } else {
            this.currAddress = null;
        }
    }
    send() {
        const data = {
            userId: this.employeeId,
            name: this.employeeName,
            father: this.fatherName,
            permanentAddress: this.permAddress,
            currentAddress: this.currAddress,
            email: this.email,
            mobile1: this.mobileNo,
            mobile2: this.altMobileNo,
            landline: this.landlineNo,
            pan: this.pan,
            adharNo: this.aadharNo,
            enroll: this.enrollDate,
        };
        this.service.sendData(data).subscribe(
            result => {
                if (result.nameData.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'This user does not exists!',
                        icon: 'error',
                    });
                } else {
                    Swal.fire({
                        text: 'Sent!',
                        icon: 'success',
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
