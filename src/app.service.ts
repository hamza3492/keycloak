import { Injectable } from '@nestjs/common';
// import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
// import { Severity } from '@sentry/node';

@Injectable()
export class AppService {
    // constructor(
    //     @InjectSentry() private readonly client: SentryService) {
    //     client.log('AppSevice Loaded', 'test', true); // creates log asBreadcrumb //
    //     client.instance().addBreadcrumb({ level: Severity.Debug, message: 'How to use native breadcrumb', data: { context: 'WhatEver' } })
    //     client.debug('AppService Debug', 'context');
    // }
}