import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';

/**
 * Reemplaza y parametriza @SetMetadata('roles', ['admin', 'super-user'])
 * @param args roles del usuario del Enum ValidRoles
 */
export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
