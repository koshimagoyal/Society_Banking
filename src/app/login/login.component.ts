import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@app/login/model/login';
import { SessionStorageService } from 'ngx-webstorage';
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AuthService } from './services';
import { NavigationService } from '@app/navigation/services';

@Component({
    selector: 'sb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    private userLogin = new Login();
    private user: any;
    constructor(
        public router: Router,
        public authService: AuthService,
        public fb: FormBuilder,
        public session: SessionStorageService,
        public navService: NavigationService
    ) {
        this.form = this.fb.group({
            userId: [],
            password: [''],
        });
    }
    login() {
        // @ts-ignore
        this.userLogin.userId = this.form.get('userId').value;
        // @ts-ignore
        this.userLogin.password = this.form.get('password').value;

        if (!this.userLogin.userId || !this.userLogin.password) {
            Swal.fire({
                title: 'Oops!',
                text: 'Try again!',
                icon: 'error',
            });
        } else {
            this.authService.getLoginAuth$(this.userLogin).subscribe((data: any) => {
                console.log(data);
                if (data.length === 0) {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'Data does not exists!',
                        icon: 'error',
                    });
                } else {
                    const user = {
                        id: data[0].userId,
                        name: data[0].name,
                        email: data[0].email,
                        address: data[0].currentAddress,
                        role: data[0].roleId,
                    };
                    this.session.store('user', user);
                    if (data[0].role === 'employee') {
                        this.router.navigateByUrl('/emp-dashboard');
                    } else if (data[0].role === 'admin') {
                        this.router.navigateByUrl('/dashboard');
                    } else {
                        this.router.navigateByUrl('/error/error-401');
                    }
                }
            });
        }
    }
    ngOnInit() {}
}
