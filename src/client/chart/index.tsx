import type { FunctionComponent } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

export interface CoronaChartProps {
    city: ReadonlyArray<string>;
    npatients: ReadonlyArray<string>;
}

export const CoronaChart: FunctionComponent<CoronaChartProps> = (props) => {
    // Added to prevent below error
    // Error: "category" is not a registered scale
    // NOTE: https://zenn.dev/rinda_1994/articles/7e04702247f3e2
    Chart.register(...registerables);

    const cityList: Array<string> = props.city as Array<string>;

    const graphData = {
        labels: cityList,
        datasets: [
            {
                label: '都道府県',
                data: props.npatients,
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

    const options: {} = {
        maintainAspectRatio: false,
        responsive: false,
    };

    return <Bar height={450} width={450} data={graphData} options={options} />;
};
