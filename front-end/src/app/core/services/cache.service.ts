import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { IAuthStatus } from '../../shared/interfaces/auth-status';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  
  setToken(jwt: string) {
    localStorage.setItem('jwt', jwt)
  }
  
  getToken(): string {
    return localStorage.getItem('jwt') || ''
  }

  getDecodedToken(): IAuthStatus {
    return JWT(this.getToken())
  }

  clearToken() {
    localStorage.removeItem('jwt')
  }
}
