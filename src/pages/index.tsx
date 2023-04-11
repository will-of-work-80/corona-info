import type { GetServerSideProps } from 'next';
import type { FunctionComponent } from 'react';
import { CoronaInfoProps, getCoronaByDate } from '../server/coronavirus/data';
import { CoronaViewEntity } from '../server/coronavirus/entity';
import { GithubInfoProps, getGithub } from '../server/github/data';
import { Corona } from '../client/corona';
import { getBeforeNdays } from '../utils/date';
import { compareFunc } from '../utils/calculation';
import { priceFormat } from '../utils/format';
import { CLIENT_ERROR_MESSAGE } from '../utils/check-error';

type Props = CoronaInfoProps & GithubInfoProps & CoronaViewEntity;

const TopRoot: FunctionComponent<Props> = (props) => {
    return (
        <div>
            {props.errorInfo.errorFlag === '0' ? (
                <Corona
                    noticeInfo={props.noticeInfo}
                    listInfo={props.itemList}
                    chartInfo={props.chartInfo}
                />
            ) : (
                <>
                    <div>エラーが発生しました。以下をご確認ください。</div>
                    <div>{props.errorInfo.errorCode}</div>
                    <div>{props.errorInfo.errorMessage}</div>
                </>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const github = await getGithub();
    let coronaByDate = null;
    let coronaByDateOneDayAge = null;
    for (let i = 0; i < 10; ++i) {
        coronaByDate = await getCoronaByDate(getBeforeNdays(i));
        if (coronaByDate?.itemList && coronaByDate.itemList.length !== 0) {
            coronaByDateOneDayAge = await getCoronaByDate(getBeforeNdays(i + 1));
            break;
        }
    }
    if (!coronaByDate || !coronaByDateOneDayAge) {
        return {
            props: {
                errorInfo: CLIENT_ERROR_MESSAGE.DEFAULT_ERROR,
            },
        };
    }
    const sortItemList = coronaByDate.itemList ? coronaByDate.itemList.sort(compareFunc) : [];
    const city = sortItemList.map((arg) => arg.nameJp) || [];
    const npatients = sortItemList.map((arg) => arg.npatients);

    const props = {
        props: {
            ...github,
            errorInfo: coronaByDate.errorInfo,
            noticeInfo: {
                infoFormatDate: coronaByDateOneDayAge.date,
                totalInfected: coronaByDate.countInfected - coronaByDateOneDayAge.countInfected,
                totalInfectedTokyo:
                    coronaByDate.countInfectedTokyo - coronaByDateOneDayAge.countInfectedTokyo,
            },
            itemList: sortItemList.map((arg) => {
                return {
                    date: arg.date,
                    nameJp: arg.nameJp,
                    npatients: priceFormat(arg.npatients, 3),
                };
            }),
            chartInfo: {
                city: city,
                npatients: npatients,
            },
        },
    };
    return props;
};

export default TopRoot;
