import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'CognitoAuthorityUrl',
              redirectUrl: 'http://localhost:4200/',
              postLogoutRedirectUri: 'http://localhost:4200/',
              clientId: 'CognitoClientId',
              scope: 'email openid profile', // 'openid profile offline_access ' + your scopes
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
