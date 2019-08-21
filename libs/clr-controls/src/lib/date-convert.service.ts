import { InjectionToken, Optional, Inject, Injectable } from '@angular/core';
import { format as formatDate, parse as parseDate } from 'date-fns/esm/fp';
import { pipe } from 'ramda';

export interface DateTimeConfig {
    // format control's date string to date (default to MM/DD/YYYY)
    // MM/DD/YYYY - default en localization right now in app localization is custom dynmamic so this one always true
    controlsFormat?: string;
    // format Date to domain date string (default to YYYY-MM-DDTHH:mm:ssZ)
    domainFormat?: string;
}

export const DATE_CONVERT_CONFIG = new InjectionToken<DateTimeConfig>('DATE_CONVERT_CONFIG');

const parse = (format: string) => (str: string | null | undefined) => {
    if (!str) {
        return undefined;
    }

    return parseDate(new Date(), format, str);
};

const translateDateStr = (parseStr: string, formatStr: string, str: string | null | undefined) => {
    if (!str) {
        return undefined;
    }
    return pipe(
        parse(parseStr),
        x => x && formatDate(formatStr)(x)
    )(str);
};

/**
 * Convert dates from controls formatted values to domain formatted strings
 * Input events value -> format to Date -> parse Date to domain formatted string
 */
@Injectable({ providedIn: 'root' })
export class DateConvertService {
    constructor(
        @Optional()
        @Inject(DATE_CONVERT_CONFIG)
        private readonly config: DateTimeConfig | undefined
    ) {}

    /**
     * Convert control's way formatted date string to date
     */
    parseControlDate(controlValue: string | null | undefined): Date | undefined {
        return parse(this.domainFormatStr)(controlValue);
    }

    /**
     * Format date to string in control format
     */
    formatToControlsStr(date: Date | null | undefined): string | undefined {
        if (!date) {
            return undefined;
        }
        return formatDate(this.controlsFormatStr, date);
    }

    /**
     * Convert domain's way formatted date string to date
     */
    parseDomainDate(domainValue: string | null | undefined): Date | undefined {
        return parse(this.domainFormatStr)(domainValue);
    }

    /**
     * Format date to string in domain format
     */
    formatToDomainStr(date: Date | null | undefined): string | undefined {
        if (!date) {
            return undefined;
        }
        return formatDate(this.domainFormatStr, date);
    }

    /**
     * Converts control date string to domain string
     */
    convert(controlValue: string | null | undefined): string | undefined {
        return translateDateStr(this.controlsFormatStr, this.domainFormatStr, controlValue);
    }

    /**
     * Converts domain string to control date string
     */
    format(str: string | null | undefined): string | undefined {
        return translateDateStr(this.domainFormatStr, this.controlsFormatStr, str);
    }

    private get domainFormatStr(): string {
        if (this.config && this.config.domainFormat) {
            return this.config.domainFormat;
        }
        return 'yyyy-MM-dd\'T\'HH:mm:ss';
    }

    private get controlsFormatStr(): string {
        if (this.config && this.config.controlsFormat) {
            return this.config.controlsFormat;
        }
        // TODO: retrieve from ng locale
        return 'MM\/dd\/yyyy';
    }
}
