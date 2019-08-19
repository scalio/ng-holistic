import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const DATA_LOCAL_STORAGE_KEY = 'DATA_LOCAL_STORAGE_KEY';

@Injectable()
export class DataService {
    loadData() {
        const data = localStorage.getItem(DATA_LOCAL_STORAGE_KEY);
        return of(data ? JSON.parse(data) : null);
    }

    saveData(data: any) {
        localStorage.setItem(DATA_LOCAL_STORAGE_KEY, JSON.stringify(data));
        return of();
    }
}
