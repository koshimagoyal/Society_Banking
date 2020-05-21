import { Injectable } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable()
export class NavigationService {
    _sideNavVisible$ = new BehaviorSubject(true);
    constructor(public route: ActivatedRoute, public router: Router) {}

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
}
