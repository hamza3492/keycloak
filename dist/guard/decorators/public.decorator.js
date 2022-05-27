"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.Unprotected = exports.META_SKIP_AUTH = exports.META_UNPROTECTED = void 0;
const common_1 = require("@nestjs/common");
exports.META_UNPROTECTED = 'unprotected';
exports.META_SKIP_AUTH = 'skip-auth';
const Unprotected = (skipAuth = true) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.META_UNPROTECTED, true), (0, common_1.SetMetadata)(exports.META_SKIP_AUTH, skipAuth));
exports.Unprotected = Unprotected;
const Public = (skipAuth = true) => (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.META_UNPROTECTED, true), (0, common_1.SetMetadata)(exports.META_SKIP_AUTH, skipAuth));
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map