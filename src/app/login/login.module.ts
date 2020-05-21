import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        NavigationModule,
        ReactiveFormsModule,
    ],
})
export class LoginModule { }
