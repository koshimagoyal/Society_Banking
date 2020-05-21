import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Injectable,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { NavigationService } from '@app/navigation/services';
import { Subscription } from 'rxjs';
import { UserService } from '@app/app-common/services';

@Component({
    selector: 'sb-layout-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @Input() isActive!: boolean;
    expanded = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    //sideNavData: SideNavData;
    //sideNavItems: any;
    //sideNavSections: any;
    sidenavStyle = 'sb-sidenav-dark';
    item: any;
    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        public userService: UserService) {
        //this.sideNavItems = this.sideNavData.sideNavItems;
        //this.sideNavSections = this.sideNavData.sideNavSections;
        //console.log(this.sideNavData.item);
    }
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
        // this.sideNavData = new SideNavData(this.translate);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
