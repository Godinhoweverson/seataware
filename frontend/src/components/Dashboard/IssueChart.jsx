import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function IssueChart({data}){

    const options ={
        responsive: true,
        maintainAspectRatio: false,
    };

    const chartData = {
        labels: data.map(item => item.issue_type),
        datasets: [
            {
            label: "Reports",
            data: data.map(item => item.total),
            backgroundColor:[ 
                "#198754",
                "#0d6efd",
                "#ffc107",
                "#dc3545",
                "#6f42c1",
                "#20c997",
                "#fd7e14",
                ],
            },
        ],
    };

    return (
        <div style={{height:"300px", width:"100%"}} className="card-body p-4">
            <Pie data={chartData} options={options}/>
        </div>
    )
}

export default IssueChart;