import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NavigationService {
    img: any;
    _sideNavVisible$ = new BehaviorSubject(true);
    constructor(public route: ActivatedRoute, public router: Router, public http: HttpClient) {}

    sideNavVisible$(): Observable<boolean> {
        return this._sideNavVisible$;
    }

    toggleSideNav(visibility?: boolean) {
        if (typeof visibility !== 'undefined') {
            this._sideNavVisible$.next(visibility);
        } else {
            this._sideNavVisible$.next(!this._sideNavVisible$.value);
        }
    }

    getUserImage(userId: any) {
        const body = {
            id: userId,
        };
        console.log(body);
        this.http
            .post('http://localhost:8080/data/user/profileimage', body, {
                observe: 'response',
                responseType: 'blob',
            })
            .subscribe(data => {
                console.log(data);
                // @ts-ignore
                this.createImageFromBlob(data.body);
            });
    }
    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                this.img = reader.result;
            },
            false
        );
        if (image.size > 14) {
            reader.readAsDataURL(image);
        }
    }
}
