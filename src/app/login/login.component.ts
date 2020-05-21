import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@app/app-common/services';

@Component({
  selector: 'sb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    constructor(
        public router: Router,
        public authService: AuthService,
        public fb: FormBuilder,
        public userService: UserService
    ) {
        this.form = this.fb.group({
            userId: [],
            password: [''],
        });
    }
    login() {
        // @ts-ignore
        const userId = this.form.get('userId').value;
        // @ts-ignore
        const password = this.form.get('password').value;
        this.authService.getLoginAuth$(userId, password).subscribe((data: any) => {
            console.log(data);
            if (data.type === 'employee') {
                this.userService.user = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    companyName: data.companyName,
                    email: data.email,
                    type: data.type,
                };
                this.router.navigateByUrl('/emp-dashboard');
            } else if (data.type === 'accountant') {
                this.userService.user = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    companyName: data.companyName,
                    email: data.email,
                    type: data.type,
                };
                this.router.navigateByUrl('/dashboard');
            } else {
                this.router.navigateByUrl('/error/error-401');
            }
        });
    }
    ngOnInit() {}
}
