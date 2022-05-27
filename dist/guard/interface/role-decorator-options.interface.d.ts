import { RoleMatchingMode } from '../constants';
export interface RoleDecoratorOptionsInterface {
    roles: string[];
    mode?: RoleMatchingMode;
}
