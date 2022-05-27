"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.META_ROLES = void 0;
const common_1 = require("@nestjs/common");
exports.META_ROLES = 'roles';
const Roles = (roleMetaData) => (0, common_1.SetMetadata)(exports.META_ROLES, roleMetaData);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map