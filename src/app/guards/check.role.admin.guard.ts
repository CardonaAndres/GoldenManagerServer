import { Roles } from 'src/users/ts/enums';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class CheckAdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { role_ID } = req.user;
  
    if(role_ID && role_ID !== Roles.ADMIN)
      throw new ForbiddenException('No tienes permiso para realizar esta función')
    
    return true;
  }
}