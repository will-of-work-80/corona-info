import styles from './index.module.css';
import { type FunctionComponent, useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { type ChartData, Chart, registerables } from 'chart.js';
import { sliceByNumber } from '../../utils/array';

export interface CoronaChartProps {
    city: ReadonlyArray<string>;
    npatients: ReadonlyArray<number>;
}

export const CoronaChart: FunctionComponent<CoronaChartProps> = (props) => {
    // Added to prevent below error
    // Error: "category" is not a registered scale
    // NOTE: https://zenn.dev/rinda_1994/articles/7e04702247f3e2
    Chart.register(...registerables);

    const [chartData, setChartData] = useState<ChartData<'bar'>>({ datasets: [] });
    const [next, setNext] = useState(0);
    const viewData = useMemo(() => {
        return {
            cityList: sliceByNumber(props.city, 6),
            npatients: sliceByNumber(props.npatients, 6),
        };
    }, [props.city, props.npatients]);

    useEffect(() => {
        if (!viewData.cityList) {
            return;
        }
        if (viewData.cityList.length <= next) {
            setNext(0);
            return;
        }
        if (!viewData.npatients) {
            return;
        }
        const data: ChartData<'bar'> = {
            labels: viewData.cityList[next],
            datasets: [
                {
                    label: '都道府県',
                    data: viewData.npatients[next],
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        // 'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        setChartData(data);
    }, [next, viewData]);

    const options: {} = {
        maintainAspectRatio: false,
        responsive: false,
    };

    return (
        <>
            <Bar height={450} width={450} data={chartData} options={options} />
            <button className={styles.nextButton} onClick={() => setNext(next + 1)}>
                次へ
            </button>
        </>
    );
};
