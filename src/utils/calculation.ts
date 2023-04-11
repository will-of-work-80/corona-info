import { CoronaItemEntity } from '../server/coronavirus/entity';

export const compareFunc = (a: CoronaItemEntity, b: CoronaItemEntity) => {
    return b.npatients - a.npatients;
};
