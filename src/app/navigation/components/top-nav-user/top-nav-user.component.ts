import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/navigation/services';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    user: any;
    constructor(
        public session: SessionStorageService,
        public translate: TranslateService,
        public naviService: NavigationService
    ) {}
    ngOnInit() {
        this.user = this.session.retrieve('user');
        console.log(this.user);
        this.naviService.getUserImage(this.user.id);
    }
}
