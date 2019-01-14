/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from './@theme/components/auth';

import { AuthGuard } from './auth-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
            baseEndpoint: 'http://api.clubemapa.com.br:1337',
            login: {
              endpoint: '/auth/local',
              method: 'post',
            },
            register: {
              endpoint: '/auth/local/register',
            },
            token: {
              class: NbAuthJWTToken,
              key: 'jwt',
            },
        }),
      ],
      forms: {
        logout: {
          redirectDelay: 0,
          strategy: 'email',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
  ],
})
export class AppModule {
}
