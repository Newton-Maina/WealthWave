'use client'

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {

    const accountNames = accounts.map((a) => a.name);
    const balances = accounts.map((a) => a.currentBalance)

    const data = {
        datasets: [
            {
                label: 'Banks',
                data: balances.length > 0 ? balances : [1],
                backgroundColor: balances.length > 0 ? ['#0747b6', '#2265d8', '#2f91fa'] : ['#E5E7EB']
            }
        ],
        labels: accountNames.length > 0 ? accountNames : ['No Accounts']
    }
    return <Doughnut
        data={data}
        options={{
            cutout: '60%',
            plugins:{
                legend:{
                    display: false
                }
            }
        }}
    />
}
export default DoughnutChart
