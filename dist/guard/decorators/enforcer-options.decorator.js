"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnforcerOptions = exports.META_ENFORCER_OPTIONS = void 0;
const common_1 = require("@nestjs/common");
exports.META_ENFORCER_OPTIONS = 'enforcer-options';
const EnforcerOptions = (opts) => (0, common_1.SetMetadata)(exports.META_ENFORCER_OPTIONS, opts);
exports.EnforcerOptions = EnforcerOptions;
//# sourceMappingURL=enforcer-options.decorator.js.map