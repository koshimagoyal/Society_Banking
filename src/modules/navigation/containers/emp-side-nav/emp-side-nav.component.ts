import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { EmpSideNavItems, EmpSideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-emp-side-nav',
    templateUrl: './emp-side-nav.component.html',
    styleUrls: ['./emp-side-nav.component.scss'],
})
export class EmpSideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: EmpSideNavItems;
    @Input() sideNavSections!: EmpSideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;
    constructor(public navigationService: NavigationService, public userService: UserService) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
