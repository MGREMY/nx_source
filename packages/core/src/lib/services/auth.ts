import { CONFIG_SERVICE } from './app-config';

import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  provideAppInitializer,
  Provider,
  signal,
  Signal,
  Type,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUTH_CONFIG, AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { filter, from, map, Observable, tap } from 'rxjs';

export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');

export interface IdToken {
  sub: string;
  iss: string;
  aud: string | string[];
  exp: number;
  iat: number;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
  preferred_username?: string;
  [key: string]: unknown;
}

export interface AccessToken {
  exp: number;
  iat: number;
  jti: string | undefined;
  iss: string;
  aud: string;
  sub: string;
  typ: string | undefined;
  azp: string | undefined;
  sid: string | undefined;
  acr: string | undefined;
  'allowed-origins': string[] | undefined;
  realm_access: Record<string, string[]> | undefined;
  scope: string | undefined;
  email_verified: boolean | undefined;
  roles: string[] | undefined;
  name: string | undefined;
  preferred_username: string | undefined;
  given_name: string | undefined;
  family_name: string | undefined;
  email: string | undefined;
}

export interface IAuthService {
  isAuthenticated: Signal<boolean>;

  init(): Observable<void>;

  getIdToken(): IdToken;

  getAccessToken(): string;

  getDecodedAccessToken(): AccessToken | undefined;

  hasRoles(roles: string): boolean;
  hasRoles(roles: string[], mode: 'any' | 'all'): boolean;

  login(): void;

  logout(): void;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService {
  private readonly _authService = inject(OAuthService);

  private readonly _isAuthenticated = signal(this._authService.hasValidAccessToken());
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    this._authService.configure(inject(AUTH_CONFIG));
    this._authService.setupAutomaticSilentRefresh();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'token_received'),
        tap(() => this._isAuthenticated.set(true))
      )
      .subscribe();

    this._authService.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type == 'logout' || event.type == 'token_expires'),
        tap(() => this._isAuthenticated.set(false))
      )
      .subscribe();
  }

  init(): Observable<void> {
    return from(this._authService.loadDiscoveryDocumentAndTryLogin()).pipe(map(() => void 0));
  }

  getIdToken(): IdToken {
    return this._authService.getIdentityClaims() as IdToken;
  }

  getAccessToken(): string {
    return this._authService.getAccessToken();
  }

  getDecodedAccessToken(): AccessToken | undefined {
    const accessToken = this.getAccessToken();

    try {
      return jwtDecode<AccessToken>(accessToken);
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  hasRoles(roles: string): boolean;
  hasRoles(roles: string[], mode: 'any' | 'all'): boolean;
  hasRoles(roles: string | string[], mode: 'any' | 'all' = 'any'): boolean {
    if (this._isAuthenticated() === false) return false;

    const accessToken = this.getDecodedAccessToken();

    if (accessToken?.roles == undefined) return false;

    if (Array.isArray(roles)) {
      if (mode === 'any') {
        return accessToken.roles.some((role) => roles.includes(role));
      } else {
        return accessToken.roles.filter((role) => roles.includes(role)).length === roles.length;
      }
    } else {
      return accessToken.roles.includes(roles);
    }
  }

  login(): void {
    return this._authService.initLoginFlow();
  }

  logout(): void {
    return this._authService.logOut();
  }
}

export function provideAuthConfig(options?: {
  service?: Type<IAuthService>;
  authConfig?: AuthConfig;
}): (Provider | EnvironmentProviders)[] {
  return [
    provideOAuthClient(),
    {
      provide: AUTH_CONFIG,
      useFactory: () => {
        const configService = inject(CONFIG_SERVICE);

        return (
          options?.authConfig ??
          ({
            issuer: `${configService.authUrl}/realms/${configService.authRealm}`,
            clientId: configService.authClientId,
            responseType: 'code',
            scope: 'openid offline_access',
            redirectUri: configService.appUrl,
            showDebugInformation: false,
          } as AuthConfig)
        );
      },
      deps: [CONFIG_SERVICE],
    },
    { provide: AUTH_SERVICE, useClass: options?.service ?? AuthService },
    provideAppInitializer(() => inject(AUTH_SERVICE).init()),
  ];
}
