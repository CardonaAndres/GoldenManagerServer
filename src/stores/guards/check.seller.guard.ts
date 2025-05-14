import { Roles } from 'src/users/ts/enums';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class CheckSellerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { role_ID } = req.user;

    const rolesAllowed = [Roles.SELLER, Roles.ADMIN];
  
    if(!rolesAllowed.includes(role_ID))
      throw new ForbiddenException('No tienes permiso para realizar esta función')
    
    return true;
  }
}