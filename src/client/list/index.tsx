import type { FunctionComponent } from 'react';
import type { CoronaItemEntity } from '../../server/coronavirus/entity';
import styles from './index.module.css';

export interface CoronaListProps {
    list: Array<CoronaItemEntity> | null;
}

export const CoronaList: FunctionComponent<CoronaListProps> = (props) => {
    if (!props.list) {
        return null;
    }
    return (
        <>
            <div>※一番最新({props.list[0].date})のデータを表示しています。</div>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {props.list.map((item) => (
                        <li className={styles.item}>
                            <div className={styles.nameJp}>{item.nameJp}</div>
                            <div className={styles.npatients}>{item.npatients}人</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
