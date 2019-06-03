import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const HLC_HTTP_JWT_TOKEN_GETTER = new InjectionToken<() => string>(
    'HLC_JWT_HTTP_TOKEN_GETTER'
);

export class HlcHttpJwtTokenInterceptor implements HttpInterceptor {
    constructor(
        @Inject(HLC_HTTP_JWT_TOKEN_GETTER) private readonly getter: () => string
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const jwtToken = this.getter();
        request = request.clone({
            headers: request.headers.append(
                'Authorization',
                `Bearer ${jwtToken}`
            )
        });

        return next.handle(request);
    }
}
