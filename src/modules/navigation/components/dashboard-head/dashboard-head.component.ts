import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sb-dashboard-head',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-head.component.html',
    styleUrls: ['dashboard-head.component.scss'],
})
export class DashboardHeadComponent implements OnInit {
    @Input() title!: string;
    @Input() hideBreadcrumbs = false;

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['english', 'hindi']);
        this.translate.setDefaultLang('english');
        const browserLang = this.translate.currentLang;
        this.translate.use(browserLang)
    }
    ngOnInit() {}
}
