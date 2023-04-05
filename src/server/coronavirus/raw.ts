export interface CoronaItemRaw {
    date: string;
    name_jp: string;
    npatients: string;
}

export interface CoronaInfoRaw {
    errorInfo: {
        errorFlag: string;
        errorCode: string | null;
        errorMessage: string | null;
    };
    itemList: ReadonlyArray<CoronaItemRaw> | null;
}
