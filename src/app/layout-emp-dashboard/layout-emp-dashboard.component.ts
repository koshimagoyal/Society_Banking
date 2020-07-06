import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@app/top-nav/services';
import { SessionStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-layout-emp-dashboard',
    templateUrl: './layout-emp-dashboard.component.html',
    styleUrls: ['./layout-emp-dashboard.component.scss'],
})
export class LayoutEmpDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @Input() isActive!: boolean;
    expanded = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sidenavStyle = 'sb-sidenav-dark';
    user: any;
    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        public session: SessionStorageService
    ) {}
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
        this.user = this.session.retrieve('user');
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
