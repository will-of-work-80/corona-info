export interface OccurrenceStatusCountryItemRaw {
    date: string;
    dataName: string;
    infectedNum: string;
    deceasedNum: string;
}

export interface OccurrenceStatusCountryInfoRaw {
    errorInfo: {
        errorFlag: string;
        errorCode: string | null;
        errorMessage: string | null;
    };
    itemList: ReadonlyArray<OccurrenceStatusCountryItemRaw> | null;
}
