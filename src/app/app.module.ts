import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as authServices from '@app/login/services';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
    return new TranslateHttpLoader(new HttpClient(httpBackend));
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        NgxWebstorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                deps: [HttpBackend],
                useFactory: translateHttpLoaderFactory,
            },
        }),
        BrowserAnimationsModule,
    ],
    providers: [...authServices.services],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
