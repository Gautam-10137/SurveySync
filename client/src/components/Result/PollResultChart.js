import React from 'react'
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
    const calculatePercentages = (voteData) => {
        const totalVotes = voteData.reduce((sum, votes) => sum + votes, 0);
        return voteData.map((votes) => ((votes / totalVotes) * 100).toFixed(2));
      };
const PollResultChart = ({data}) => {
    const percentages = calculatePercentages(data.map((choice)=>choice.votes));
    const totalVotes = data.reduce((sum, option) => sum + option.votes, 0);
    const chartData={
        labels: data.map((choice)=>choice.choiceText),
        datasets:[
            {
                label:`Total Votes: ${totalVotes}`,
                data: data.map((choice)=>choice.votes),
                backgroundColor:'rgba(75,192,192,0.2)',
                borderColor:'rgba(75,192,192,1)',
                borderWidth:1,
            }
        ]
    };

    const chartOptions={
        scales:{
            x:{
                type:'category',
                beginAtZero:true
            },
            y:{
                beginAtZero:true
            }
        },
        plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y || 0;
                  const percentage = percentages[context.dataIndex];
                  return `${label}: ${value} votes (${percentage}%)`;
                },
                
              },
            },
           
          },
    };
  return (
    <div className='chart-container'>
    <Bar
       data={chartData} options={chartOptions}>
    </Bar>
    </div>
  )
}

export default PollResultChart
