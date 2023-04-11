import styles from './index.module.css';
import { type FunctionComponent, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { type ChartData, Chart, registerables } from 'chart.js';

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
    const [next, setNext] = useState(true);

    useEffect(() => {
        let cityList: Array<string> = [];
        let npatients: Array<number> = [];
        if (next) {
            cityList = props.city.slice(0, 6);
            npatients = props.npatients.slice(0, 6);
        } else {
            cityList = props.city.slice(6, 12);
            npatients = props.npatients.slice(6, 12);
        }
        const data: ChartData<'bar'> = {
            labels: cityList,
            datasets: [
                {
                    label: '都道府県',
                    data: npatients,
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
    }, [next, props.city, props.npatients]);

    const options: {} = {
        maintainAspectRatio: false,
        responsive: false,
    };

    return (
        <>
            <Bar height={450} width={450} data={chartData} options={options} />
            <button className={styles.nextButton} onClick={() => setNext(!next)}>
                次へ
            </button>
        </>
    );
};
