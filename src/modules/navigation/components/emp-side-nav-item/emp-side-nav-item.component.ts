import { Component, Input, OnInit } from '@angular/core';
import { EmpSideNavItem, SBRouteData } from '@modules/navigation/models';

@Component({
    selector: 'sb-emp-side-nav-item',
    templateUrl: './emp-side-nav-item.component.html',
    styleUrls: ['./emp-side-nav-item.component.scss'],
})
export class EmpSideNavItemComponent implements OnInit {
    @Input() sideNavItem!: EmpSideNavItem;
    @Input() isActive!: boolean;
    expanded = false;
    routeData!: SBRouteData;
    constructor() {}

    ngOnInit(): void {}
}
