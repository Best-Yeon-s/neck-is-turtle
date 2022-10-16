import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import MyResponsivePie from './TodayPieChart';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['바른 자세 시간', '거북목 시간'],
  datasets: [
    {
      label: '자세 측정',
      data: [10, 1],
      backgroundColor: [
        '#5C913B',
        '#BBBBBB',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

export function TodayChart() {
  return (
    <div className="today-chart chart-wrapper">
        <div className="chart-title">Today</div>
        <div className="today-status-wrapper">
            <div className="today-status-chart">
                {/* <Doughnut className="chart" data={data} /> */}
                <MyResponsivePie/>
            </div>
            {/* <div className="today-status">
                <div>바른 자세 비율</div>
                <div className="straight-percent">
                    80<span>%</span>
                </div>
                <div>5h 30min</div>
            </div> */}
        </div>

    </div>
  )
}
