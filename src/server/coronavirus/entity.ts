import { CoronaItemRaw } from './raw';

export interface CoronaInfoEntity {
    errorInfo: {
        errorFlag: string;
        errorCode: string | null;
        errorMessage: string | null;
    };
    itemList: Array<CoronaItemEntity> | null;
    countInfected: number;
    countInfectedTokyo: number;
    date: string;
}

export interface CoronaViewEntity {
    noticeInfo: {
        infoFormatDate: string;
        totalInfected: number | null;
        totalInfectedTokyo: number | null;
    };
    chartInfo: {
        city: ReadonlyArray<string>;
        npatients: ReadonlyArray<number>;
    };
}

interface Input {
    date: string;
    name_jp: string;
    npatients: string;
}

export class CoronaItemEntity {
    readonly date: string;
    readonly nameJp: string;
    readonly npatients: number;

    constructor(info: Input) {
        this.date = info.date;
        this.nameJp = info.name_jp;
        this.npatients = Number(info.npatients);
    }

    static converter(raw: CoronaItemRaw) {
        return new CoronaItemEntity(raw);
    }
}
