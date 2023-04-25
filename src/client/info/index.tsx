import type { FunctionComponent } from 'react';
import styles from './index.module.css';
import { priceFormat } from '../../utils/format';

export interface CoronaInfoProps {
    infoFormatDate: string;
    totalInfected: number | null;
    totalInfectedTokyo: number | null;
}

export const CoronaInfo: FunctionComponent<CoronaInfoProps> = (props) => {
    if (!(props.totalInfected && props.totalInfectedTokyo)) {
        return null;
    }
    return (
        <ul className={styles.container}>
            {props.totalInfected ? (
                <li>
                    前日({props.infoFormatDate})より{priceFormat(props.totalInfected, 3)}
                    人増えています。
                </li>
            ) : null}
            {props.totalInfectedTokyo ? (
                <li>
                    東京は前日({props.infoFormatDate})より{priceFormat(props.totalInfectedTokyo, 3)}
                    人増えています。
                </li>
            ) : null}
        </ul>
    );
};
