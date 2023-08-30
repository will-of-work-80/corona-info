import { OccurrenceStatusCountryItemRaw } from './raw';

export interface OccurrenceStatusCountryInfoEntity {
    errorInfo: {
        errorFlag: string;
        errorCode: string | null;
        errorMessage: string | null;
    };
    itemList: Array<OccurrenceStatusCountryItemEntity> | null;
}

// export interface OccurrenceStatusCountryViewEntity {
// }

interface Input {
    date: string;
    dataName: string;
    infectedNum: string;
    deceasedNum: string;
}

export class OccurrenceStatusCountryItemEntity {
    readonly date: string;
    readonly country: string;
    readonly infectedNum: string;
    readonly deceasedNum: string;

    constructor(info: Input) {
        this.date = info.date;
        this.country = info.dataName;
        this.infectedNum = info.infectedNum;
        this.deceasedNum = info.deceasedNum;
    }

    static converter(raw: OccurrenceStatusCountryItemRaw) {
        return new OccurrenceStatusCountryItemEntity(raw);
    }
}
