import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/top-nav/services';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
    selector: 'sb-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    user: any;
    constructor(
        private session: SessionStorageService,
        public navigationService: NavigationService
    ) {}
    ngOnInit() {
        this.user = this.session.retrieve('user');
        console.log(this.user);
        this.navigationService.getUserImage(this.user.id);
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
