import { IValueStorage, ValueLocalStorage, ValueSessionStorage } from './value-storage';

export interface IRepositoryStorage {
    getRequest(): { request: any; meta: any };
    setRequest(request: any, meta: any, response: any): void;
    reset(): void;
}

export class RepositoryStorage implements IRepositoryStorage {
    /**
     * If response returns paginator what is different from requested, we should be able map response to request
     */
    constructor(private readonly storage: IValueStorage, private readonly mp?: MapResultToRequestFun) {}

    getRequest() {
        return this.storage.getValue();
    }

    setRequest(request: any, meta: any, response: any) {
        if (this.mp) {
            request = this.mp(request, response);
        }
        const val = { request, meta };
        this.storage.setValue(val);
    }

    reset() {
        this.storage.setValue(null);
    }
}

// Change request with data according to response, pageIndex could be different for requesed for example
export type MapResultToRequestFun = (request: any, response: any) => any;

export class RepositorySessionStorage extends RepositoryStorage {
    constructor(name: string, map?: MapResultToRequestFun, ttl?: number) {
        super(new ValueSessionStorage(name, ttl), map);
    }
}

export class RepositoryLocalStorage extends RepositoryStorage {
    constructor(name: string, map?: MapResultToRequestFun, ttl?: number) {
        super(new ValueLocalStorage(name, ttl), map);
    }
}
