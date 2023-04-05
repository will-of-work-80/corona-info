import { CoronaItemEntity } from '../server/coronavirus/entity';

export const compareFunc = (a: CoronaItemEntity, b: CoronaItemEntity) => {
    return Number(b.npatients) - Number(a.npatients);
}
