import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationModule } from '@app/navigation/navigation.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import * as service from './services';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, LoginRoutingModule, NavigationModule, ReactiveFormsModule],
    providers: [...service.services],
})
export class LoginModule {}
