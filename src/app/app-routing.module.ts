import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbAuthJWTToken
} from '@nebular/auth';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
           baseEndpoint: '162.243.171.76:1337',
           login: {
             endpoint: '/auth/local',
             method: 'post',
           },
           register: {
             endpoint: '/auth/register',
           },
           token: {
              class: NbAuthJWTToken,
              key: 'token',
            }
        }),
      ],
      forms: {
      },
    }), 
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
