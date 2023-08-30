import Link from 'next/link';
import { FunctionComponent, useCallback, useState } from 'react';
import styles from './index.module.css';

const ITEM_LIST = [
    {
        id: '01',
        href: '/',
        label: 'トップ',
    },
    {
        id: '02',
        href: '/count',
        label: '各国別感染者数・死亡者数',
    },
    {
        id: '03',
        href: '/dummy',
        label: 'ダミー3',
    },
    {
        id: '04',
        href: '/dummy',
        label: 'ダミー4',
    },
];

interface Props {
    closeNavigation: UseNavigation['closeNavigation'];
}

export const Navigation: FunctionComponent<Props> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.outer} onClick={props.closeNavigation}></div>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <span className={styles.closeButton} onClick={props.closeNavigation}>
                        close
                    </span>
                </div>
                <ul className={styles.list}>
                    {ITEM_LIST.map((item) => (
                        <li className={styles.item} onClick={props.closeNavigation} key={item.id}>
                            <Link className={styles.link} href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

interface UseNavigation {
    navigationStatus: boolean;
    openNavigation: () => void;
    closeNavigation: () => void;
}

export const useNavigation = (): UseNavigation => {
    const [navigationStatus, setNavigationStatus] = useState(false);
    const openNavigation = useCallback(() => {
        setNavigationStatus(true);
    }, []);
    const closeNavigation = useCallback(() => setNavigationStatus(false), []);

    return {
        navigationStatus,
        openNavigation,
        closeNavigation,
    };
};
