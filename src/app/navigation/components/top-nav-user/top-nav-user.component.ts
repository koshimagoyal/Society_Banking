import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { NavigationService } from '@app/navigation/services';
import { exitCodeFromResult } from '@angular/compiler-cli';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    url: string | ArrayBuffer | null = '';
    user: any;
    constructor(
        public session: SessionStorageService,
        public translate: TranslateService,
        public naviService: NavigationService
    ) {}
    async onSelectFile(event: any) {
        this.url = await this.naviService.fileUpload(event).then(result => {
            return result;
        });
        console.log(this.url);
    }
    ngOnInit() {
        this.user = this.session.retrieve('user');
    }
}
