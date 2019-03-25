import { isNil } from 'ramda';

/**
 * Abstarct inteface to get / set value to storage
 */
export interface IStorage {
    getValue(key: string): any;
    setValue(key: string, val: any): void;
}

export class StorageProxy implements IStorage {
    constructor(
        private readonly storage: {
            removeItem: ((x: string) => void);
            getItem: ((x: string) => string | null);
            setItem: ((key: string, val: string) => void);
        }
    ) {}

    getValue(name: string) {
        const item = this.storage.getItem(name);
        return item && JSON.parse(item);
    }

    setValue(name: string, val: any) {
        if (isNil(val)) {
            this.storage.removeItem(name);
        } else {
            localStorage.setItem(name, JSON.stringify(val));
        }
    }
}

export class LocalStorage extends StorageProxy {
    constructor() {
        super(localStorage);
    }
}

export class SessionStorage extends StorageProxy {
    constructor() {
        super(sessionStorage);
    }
}
