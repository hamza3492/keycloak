"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Sentry = require("@sentry/node");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    Sentry.init({
        dsn: 'https://a7f6793219124fef9b995fa16a2d9140@o1156909.ingest.sentry.io/6238672'
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map