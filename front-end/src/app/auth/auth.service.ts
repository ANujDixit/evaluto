import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as decode from 'jwt-decode'
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { transformHttpError } from '../common/common'
import { CacheService } from './cache.service'
import { Role } from './role.enum'
import { ApiService } from '../api/api.service'

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>
  login(tenantCode: string, email: string, password: string): Observable<IAuthStatus>
  logout()
  getToken(): string
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
  tenantId: string
}

interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null,
  tenantId: null
}

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService extends CacheService implements IAuthService {
  private readonly authProvider: (
    email: string,
    password: string,
    tenantCode: string
  ) => Observable<IServerAuthResponse>
  
  authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  )
  
  private signInUrl = "https://evaluto-anytimetests.c9users.io:8082/api/signin"

  constructor(private http: HttpClient) {
    super()
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus))
  }

  login(tenantCode: string, email: string, password: string): Observable<IAuthStatus> {
    this.logout()
    const signin = { "signin": { "tenant_code": tenantCode, "email": email, "password": password}} 
    const loginResponse = this.http.post(this.signInUrl, JSON.stringify(signin), httpOptions)
      .pipe(
        map(value => {
          this.setToken(value["access_token"])
          return decode(value["access_token"]) as IAuthStatus
        }),
        catchError(transformHttpError)
      )

    return loginResponse
  }

  logout() {
    this.clearToken()
    this.authStatus.next(defaultAuthStatus)
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'))
  }

  getToken(): string {
    return this.getItem('jwt') || ''
  }

  private clearToken() {
    this.removeItem('jwt')
  }
}