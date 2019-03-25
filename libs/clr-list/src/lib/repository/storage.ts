import { isNil } from 'ramda';

/**
 * Abstarct inteface to get / set value to storage
 */
export interface IStorage {
    getValue(key: string): any;
    setValue(key: string, val: any): void;
}

export class LocalStorage implements IStorage {
    getValue(name: string) {
        const item = localStorage.getItem(name);
        return item && JSON.parse(item);
    }

    setValue(name: string, val: any) {
        if (isNil(val)) {
            localStorage.removeItem(name);
        } else {
            localStorage.setItem(name, JSON.stringify(val));
        }
    }
}


