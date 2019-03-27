import { IStorage, LocalStorage, SessionStorage } from './storage';

/**
 * Abstarct storage for single value
 */
export interface IValueStorage {
    getValue(): any;
    setValue(val: any): void;
}

export class ValueStorage implements IValueStorage {
    constructor(private readonly name: string, private readonly storage: IStorage, private readonly ttl?: number) {}

    getValue() {
        const res = this.storage.getValue(this.name);
        if (res) {
            const now = +new Date();
            if (res.expired && now >= res.expired) {
                this.storage.setValue(this.name, null);
                return null;
            } else {
                return res.value;
            }
        } else {
            return null;
        }
    }

    setValue(val: any) {
        const expired = this.ttl && +new Date() + this.ttl;
        this.storage.setValue(this.name, { value: val, expired });
    }
}

export class ValueLocalStorage extends ValueStorage {
    constructor(name: string, ttl?: number) {
        super(name, new LocalStorage(), ttl);
    }
}

export class ValueSessionStorage extends ValueStorage {
    constructor(name: string, ttl?: number) {
        super(name, new SessionStorage(), ttl);
    }
}
