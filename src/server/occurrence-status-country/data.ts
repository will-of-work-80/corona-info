import fetch from 'node-fetch';
import { OccurrenceStatusCountryInfoEntity, OccurrenceStatusCountryItemEntity } from './entity';
import { OccurrenceStatusCountryInfoRaw } from './raw';
import { CLIENT_ERROR_MESSAGE } from '../../utils/check-error';

const OCCURRENCE_STATUS_COUNTRY_INFO_URL = 'https://opendata.corona.go.jp/api/OccurrenceStatusOverseas';

export type OccurrenceStatusCountryInfoProps = OccurrenceStatusCountryInfoEntity;

const useFetch = async (url: string): Promise<OccurrenceStatusCountryInfoRaw> => {
    try {
        const res = await fetch(url, {
            method: 'GET',
        });
        if (!res.ok) {
            console.error('Connection Failed!');
            if (res.status === 404) {
                return {
                    errorInfo: CLIENT_ERROR_MESSAGE.NOT_FOUND_ERROR,
                    itemList: null,
                };
            }
            return {
                errorInfo: {
                    ...CLIENT_ERROR_MESSAGE.NOT_FOUND_ERROR,
                    errorMessage: res.statusText,
                },
                itemList: null,
            };
        }
        return res.json();
    } catch (e) {
        return {
            errorInfo: CLIENT_ERROR_MESSAGE.NOT_FOUND_ERROR,
            itemList: null,
        };
    }
};

const converter = async (data: Promise<OccurrenceStatusCountryInfoRaw | null>): Promise<OccurrenceStatusCountryInfoEntity | null> => {
    const info = await data;
    if (info === null) {
        return null;
    }

    const itemList = info.itemList?.map((arg) => OccurrenceStatusCountryItemEntity.converter(arg)) || null;
    return {
        errorInfo: info.errorInfo,
        itemList,
    };
};

const getOccurrenceStatusCountryInfo = (country: string): Promise<OccurrenceStatusCountryInfoProps | null> => {
    const occurrenceStatusCountry = useFetch(`${OCCURRENCE_STATUS_COUNTRY_INFO_URL}?dataName=${country}`);
    return converter(occurrenceStatusCountry);
};

export const getOccurrenceStatusCountryInfoOfJapan = (): Promise<OccurrenceStatusCountryInfoProps | null> => {
    return getOccurrenceStatusCountryInfo('日本');
};
