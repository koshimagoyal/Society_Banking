import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { SideNavService } from '@modules/navigation/services';

export class SideNavData {
    sideNavSections: SideNavSection[];
    sideNavItems: SideNavItems;
    public item: Observable<string> | undefined;

    constructor(public translate: TranslateService) {
        this.translate.stream('sideNavSections').subscribe(data=>{})
        this.sideNavSections = [
            {
                text: 'CORE',
                items: ['dashboard'],
            },
        ];
        this.sideNavItems = {
            dashboard: {
                icon: 'tachometer-alt',
                text: this.translate.instant("Cards.Details"),
                link: '/dashboard',
            },
            /*
            layouts: {
                icon: 'columns',
                text: 'Layouts',
                submenu: [
                    {
                        text: 'Static Navigation',
                        link: '/dashboard/static',
                    },
                    {
                        text: 'Light Sidenav',
                        link: '/dashboard/light',
                    },
                ],
            },
            pages: {
                icon: 'book-open',
                text: 'Pages',
                submenu: [
                    {
                        text: 'Authentication',
                        submenu: [
                            {
                                text: 'Login',
                                link: '/auth/login',
                            },
                            {
                                text: 'Register',
                                link: '/auth/register',
                            },
                            {
                                text: 'Forgot Password',
                                link: '/auth/forgot-password',
                            },
                        ],
                    },
                    {
                        text: 'Error',
                        submenu: [
                            {
                                text: '401 Page',
                                link: '/error/401',
                            },
                            {
                                text: '404 Page',
                                link: '/error/404',
                            },
                            {
                                text: '500 Page',
                                link: '/error/500',
                            },
                        ],
                    },
                ],
            },
            charts: {
                icon: 'chart-area',
                text: 'Charts',
                link: '/charts',
            },
            tables: {
                icon: 'table',
                text: 'Tables',
                link: '/tables',
            },*/
        };
    }
}
