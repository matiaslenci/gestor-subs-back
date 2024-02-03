import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../interfaces';
import { META_ROLES, RoleProtected } from '.';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
