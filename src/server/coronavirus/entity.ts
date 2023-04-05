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
    date: string
}

export interface CoronaViewEntity {
    noticeInfo: {
        infoFormatDate: string;
        totalInfected: number | null;
        totalInfectedTokyo: number | null;
    };
    chartInfo: {
        city: ReadonlyArray<string>;
        npatients: ReadonlyArray<string>;

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
    readonly npatients: string;

    constructor(info: Input) {
        this.date = info.date;
        this.nameJp = info.name_jp;
        this.npatients = info.npatients;
    }

    static converter(raw: CoronaItemRaw) {
        return new CoronaItemEntity(raw);
    }
}
