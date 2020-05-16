import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutEmpDashboardComponent } from './layout-emp-dashboard/layout-emp-dashboard.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';

export const layouts = [
    LayoutDashboardComponent,
    LayoutAuthComponent,
    LayoutErrorComponent,
    LayoutEmpDashboardComponent,
];

export * from './layout-dashboard/layout-dashboard.component';
export * from './layout-auth/layout-auth.component';
export * from './layout-error/layout-error.component';
export * from './layout-emp-dashboard/layout-emp-dashboard.component';
