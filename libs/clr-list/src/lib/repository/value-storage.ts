import { IStorage, LocalStorage, SessionStorage } from './storage';

/**
 * Abstarct storage for single value
 */
export interface IValueStorage {
    getValue(): any;
    setValue(val: any): void;
}

export class ValueStorage implements IValueStorage {
    constructor(private readonly name: string, private readonly storage: IStorage) {}

    getValue() {
        return this.storage.getValue(this.name);
    }

    setValue(val: any) {
        this.storage.setValue(this.name, val);
    }
}

export class ValueLocalStorage extends ValueStorage {
    constructor(name: string) {
        super(name, new LocalStorage());
    }
}

export class ValueSessionStorage extends ValueStorage {
    constructor(name: string) {
        super(name, new SessionStorage());
    }
}
