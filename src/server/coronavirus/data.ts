import fetch from 'node-fetch';
import { CoronaInfoEntity, CoronaItemEntity } from './entity';
import { CoronaInfoRaw } from './raw';
import { CLIENT_ERROR_MESSAGE } from '../../utils/check-error';

const CORONA_INFO_URL = 'https://opendata.corona.go.jp/api/Covid19JapanAll';

export type CoronaInfoProps = CoronaInfoEntity;

const useFetch = async (url: string): Promise<CoronaInfoRaw> => {
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

const converter = async (data: Promise<CoronaInfoRaw | null>, date: string): Promise<CoronaInfoEntity | null> => {
    const info = await data;
    if (info === null) {
        return null;
    }

    const itemList = info.itemList?.map((arg) => CoronaItemEntity.converter(arg)) || null;
    return {
        errorInfo: info.errorInfo,
        itemList,
        countInfected: itemList && coronaSum(itemList) || 0,
        countInfectedTokyo: itemList && coronaSum(itemList, '東京都') || 0,
        date,
    };
};

export const getCoronaByDate = (date: string): Promise<CoronaInfoProps | null> => {
    const coronaInfo = useFetch(`${CORONA_INFO_URL}?date=${date}`);
    return converter(coronaInfo, date);
};

export const coronaSum = (itemList: Array<CoronaItemEntity>, city?: string): number => {
    function sumFunc(sum: number, element: number) {
        return sum + element;
    }
    return itemList
        .map((arg) => {
            if (!city) {
                return Number(arg.npatients);
            }
            if (city && arg.nameJp === city) {
                return Number(arg.npatients);
            }
            return 0;
        })
        .reduce(sumFunc, 0);
};
