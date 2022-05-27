export declare const META_UNPROTECTED = "unprotected";
export declare const META_SKIP_AUTH = "skip-auth";
export declare const Unprotected: (skipAuth?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const Public: (skipAuth?: boolean) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
