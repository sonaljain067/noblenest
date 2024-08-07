import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement,
    Title, 
    Tooltip, 
    Legend,
    ChartData,
    ChartOptions,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
   
} from 'chart.js'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import { BarChartProps, DoughnutChartProps, LineChartProps, PieChartProps } from "../../types/dash.types"

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement,
    PointElement, 
    LineElement,
    Filler
);  

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


export const BarChart = (
    {
        horizontal = false, 
        data = [], 
        data1 = [], 
        title, 
        title1, 
        bgColor, 
        bgColor1, 
        labels = months
    }: BarChartProps) => { 

    const options: ChartOptions<"bar">  = {
        responsive: true, 
        indexAxis: horizontal ? "y" : "x",
        plugins: {
            legend: {
                display: false
            }, 
            title: {
                display: false, 
            },
        },
        scales: {
            x: {
                grid: {
                    display: false 
                }
            }, 
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
    let Data: ChartData<"bar", number[], string> = {
        labels, 
        datasets: [
            {
                label: title, 
                data: data,
                backgroundColor: bgColor, 
                barThickness: "flex", 
                barPercentage: 1
            },
            {
                label: title1, 
                data: data1, 
                backgroundColor: bgColor1, 
                barThickness: "flex",
                barPercentage: 1
            } 
        ]
    } 
    if(horizontal) {
        Data.datasets = ([
            {
                label: title, 
                data: data,
                backgroundColor: bgColor, 
                barThickness: "flex", 
                barPercentage: 1,
                categoryPercentage: 0.5
            }
        ])
    }
    return <Bar options={options} data={Data}/>
}


export const DoughnutChart = ({ labels, data, bgColor, cutOut, legends = true, offset }: DoughnutChartProps) => {
    const doughnutOptions: ChartOptions<"doughnut"> = {
        responsive: true, 
        plugins: {
            legend: {
                display: legends, 
                position: "bottom", 
                labels: {
                    padding: 30, 
                }
            }
        },
        cutout: cutOut
    }
    const doughnutData: ChartData<"doughnut", number[], string> = {
        labels,
        datasets: [
            {
                data, 
                backgroundColor: bgColor, 
                borderWidth: 0, 
                offset
            }
        ]
    }


    return <Doughnut data={doughnutData} options={doughnutOptions} />; 
}

export const PieChart = ({ labels, data, bgColor, offset }: PieChartProps) => {
    const pieOptions: ChartOptions<"pie"> = {
        responsive: true, 
        plugins: {
            legend: {
                display: false
            }
        }
    }
    const pieData: ChartData<"pie", number[], string> = {
        labels,
        datasets: [
            {
                data, 
                backgroundColor: bgColor, 
                borderWidth: 1, 
                offset
            }
        ]
    }


    return <Pie data={pieData} options={pieOptions} />; 
}

export const LineChart = (
    {
        data = [], 
        label,
        bgColor, 
        borderColor,
        labels = months
    }: LineChartProps) => { 

    const options: ChartOptions<"line">  = {
        responsive: true, 
        plugins: {
            legend: {
                display: false
            }, 
            title: {
                display: false, 
            },
        },
        scales: {
            x: {
                grid: {
                    display: false 
                }
            }, 
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
    let Data: ChartData<"line", number[], string> = {
        labels, 
        datasets: [
            {
                fill: true, 
                label, 
                data,
                backgroundColor: bgColor, 
                borderColor, 
            }
        ]
    } 
    
    return <Line options={options} data={Data}/>
}