import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@app/navigation/services';
import { Subscription } from 'rxjs';
import { UserService } from '@app/app-common/services';

@Component({
    selector: 'sb-layout-emp-dashboard',
    templateUrl: './layout-emp-dashboard.component.html',
    styleUrls: ['./layout-emp-dashboard.component.scss'],
})
export class LayoutEmpDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    @Input() isActive!: boolean;
    expanded = false;
    subscription: Subscription = new Subscription();
    sidenavStyle = 'sb-sidenav-dark';
    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        public userService: UserService
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
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
