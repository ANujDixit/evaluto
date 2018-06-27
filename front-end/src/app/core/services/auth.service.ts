import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Role } from '../../shared/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cache: CacheService ) { }
  
  isLoggedInAndAdmin() {
    return !!this.cache.getToken() && !!(this.cache.getDecodedToken().userRole === Role.Admin);
  }
  
  isLoggedInAndParticipant() {
    return !!this.cache.getToken() && !!(this.cache.getDecodedToken().userRole === Role.Participant);
  }
  
  isLoggedIn() {
    return !!this.cache.getToken();
  }

  logout() {
    this.cache.clearToken();
  }
}
