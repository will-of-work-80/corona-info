import { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from './index.module.css';
import { Navigation, useNavigation } from '../navigation';

export const Header: FunctionComponent = () => {
    const { navigationStatus, openNavigation, closeNavigation } = useNavigation();
    return (
        <div className={styles.header}>
            <div className={styles.navigationButton} onClick={openNavigation}>
                <Image src="navigation-button.svg" alt="navigation button" width={24} height={24} />
            </div>
            <h1 className={styles.title}>コロナ情報</h1>
            {navigationStatus ? <Navigation closeNavigation={closeNavigation} /> : null}
        </div>
    );
};
