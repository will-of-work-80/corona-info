import styles from './index.module.css';
import type { FunctionComponent } from 'react';
import { CoronaInfo, CoronaInfoProps } from '../info';
import { CoronaList, CoronaListProps } from '../list';
import { CoronaChart, CoronaChartProps } from '../chart';

interface Props {
    noticeInfo: CoronaInfoProps;
    listInfo: CoronaListProps['list'];
    chartInfo: CoronaChartProps;
}

export const Corona: FunctionComponent<Props> = (props) => (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>コロナ情報</h1>
            </div>
            <div className={styles.headerImage}>
                <img src="https://article-image-ix.nikkei.com/https%3A%2F%2Fimgix-proxy.n8s.jp%2FDSXZQO1924133013052022000000-1.jpg?ixlib=js-2.3.2&w=638&h=395&auto=format%2Ccompress&ch=Width%2CDPR&q=45&fit=crop&bg=FFFFFF&s=1c759c0711a920c00dae258b17ade831" />
            </div>
            <div className={styles.function}>
                <h3 className={styles.functionTitle}>お知らせ</h3>
                <CoronaInfo
                    infoFormatDate={props.noticeInfo.infoFormatDate}
                    totalInfected={props.noticeInfo.totalInfected}
                    totalInfectedTokyo={props.noticeInfo.totalInfectedTokyo}
                />
            </div>
            <div className={styles.function}>
                <h3 className={styles.functionTitle}>国内の発生状況</h3>
            </div>
            <div className={styles.function}>
                <h3 className={styles.functionTitle}>全国のコロナ感染者数(リスト)</h3>
                <CoronaList list={props.listInfo} />
            </div>
            <div className={styles.function}>
                <h3 className={styles.functionTitle}>全国のコロナ感染者数(チャート)</h3>
                <div className={styles.chart}>
                    <CoronaChart
                        city={props.chartInfo.city}
                        npatients={props.chartInfo.npatients}
                    />
                </div>
            </div>
        </div>
    </div>
);
