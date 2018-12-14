import { InjectionToken } from '@angular/core';

export interface PhoneConfig {
    useParts: 'CountryCodeNumber' | 'CountryNumber';
    getCountry(val: any): string;
    getCode?(val: any): string;
    getNumber(val: any): string;
    concatValue(country: string, code: string | undefined, number: string): any;
}

export const HLC_CLR_PHONE_CONFIG = new InjectionToken('HLC_CLR_PHONE_CONFIG');

export const defaultPhoneConfig: PhoneConfig = {
    useParts: 'CountryCodeNumber',
    getCountry(val: any) {
        return val && val[0];
    },
    getCode(val: any) {
        return val && val[1];
    },
    getNumber(val: any) {
        return val && val[2];
    },
    concatValue(country: string, code: string, number: string) {
        return [country, code, number];
    }
};
