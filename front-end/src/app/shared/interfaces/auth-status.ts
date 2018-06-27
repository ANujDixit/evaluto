import { Role } from '../enums/role.enum';

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
  tenantId: string
}
