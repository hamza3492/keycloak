"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeycloakConnectOptionProvider = exports.keycloakProvider = exports.loggerProvider = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const keycloak_connect_1 = require("keycloak-connect");
const path = require("path");
const constants_1 = require("./constants");
const keycloak_connect_module_1 = require("./keycloak-connect.module");
const logger_1 = require("./logger");
exports.loggerProvider = {
    provide: constants_1.KEYCLOAK_LOGGER,
    useFactory: (opts) => {
        if (typeof opts === 'string') {
            return new common_1.Logger(keycloak_connect_1.default.name);
        }
        if (opts.logLevels) {
            keycloak_connect_module_1.KeycloakConnectModule.logger.warn(`Option 'logLevels' will be deprecated in the future. It is recommended to override or extend NestJS logger instead.`);
        }
        if (opts.useNestLogger !== null && opts.useNestLogger === false) {
            keycloak_connect_module_1.KeycloakConnectModule.logger.warn(`Setting 'useNestLogger' to false will be deprecated in the future. It is recommended to override or extend NestJS logger instead.`);
            return new logger_1.KeycloakLogger(opts.logLevels);
        }
        return new common_1.Logger(keycloak_connect_1.default.name);
    },
    inject: [constants_1.KEYCLOAK_CONNECT_OPTIONS],
};
exports.keycloakProvider = {
    provide: constants_1.KEYCLOAK_INSTANCE,
    useFactory: (opts) => {
        const keycloakOpts = opts;
        const keycloak = new keycloak_connect_1.default({}, keycloakOpts);
        if (typeof opts !== 'string' &&
            opts.tokenValidation &&
            opts.tokenValidation === constants_1.TokenValidation.NONE) {
            keycloak_connect_module_1.KeycloakConnectModule.logger.warn(`Token validation is disabled, please only do this on development/special use-cases.`);
        }
        keycloak.accessDenied = (req, res, next) => {
            req.resourceDenied = true;
            next();
        };
        return keycloak;
    },
    inject: [constants_1.KEYCLOAK_CONNECT_OPTIONS],
};
const parseConfig = (opts, config) => {
    if (typeof opts === 'string') {
        const configPathRelative = path.join(__dirname, opts);
        const configPathRoot = path.join(process.cwd(), opts);
        let configPath;
        if (fs.existsSync(configPathRelative)) {
            configPath = configPathRelative;
        }
        else if (fs.existsSync(configPathRoot)) {
            configPath = configPathRoot;
        }
        else {
            throw new Error(`Cannot find files, looked in [ ${configPathRelative}, ${configPathRoot} ]`);
        }
        const json = fs.readFileSync(configPath);
        const keycloakConfig = JSON.parse(json.toString());
        return Object.assign(keycloakConfig, config);
    }
    return opts;
};
const createKeycloakConnectOptionProvider = (opts, config) => {
    return {
        provide: constants_1.KEYCLOAK_CONNECT_OPTIONS,
        useValue: parseConfig(opts, config),
    };
};
exports.createKeycloakConnectOptionProvider = createKeycloakConnectOptionProvider;
//# sourceMappingURL=keycloak-connect.providers.js.map