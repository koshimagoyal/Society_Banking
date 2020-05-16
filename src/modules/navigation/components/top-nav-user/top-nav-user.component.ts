import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    url: string | ArrayBuffer | null = '';
    constructor(public userService: UserService, public translate: TranslateService) {}
    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (data) => { // called once readAsDataURL is completed
                if(data.target!=null)
                    this.url = data.target.result;
            }
        }
    }
    ngOnInit() {}
}
