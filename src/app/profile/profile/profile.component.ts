import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@app/profile/services';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'sb-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
    url: string | ArrayBuffer | null = '';
    formData = new FormData();
    constructor(public service: ProfileService, public session: SessionStorageService) {}

    ngOnInit(): void {
        this.formData = new FormData();
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
        this.formData.append('data', JSON.stringify(data));
        this.service.sendData(this.formData).subscribe(
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
                    }).then((isConfirm: any) => {
                        if (isConfirm) {
                            this.formData = new FormData();
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
    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = e => {
                // called once readAsDataURL is completed
                // @ts-ignore
                this.url = e.target.result;
            };
            // @ts-ignore
            this.formData.append('file', event.target.files[0], event.target.files[0].name);
        }
    }
}
