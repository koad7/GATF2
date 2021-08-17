import React from "react";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: ""
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: false
      },
      showInLegend: false
    }
  },
  series: [
    {
      name: "",
      color: "#006600",
      lineWidth: 1,
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3,
        states: {
          hover: {
            enabled: true,
            lineWidth: 1
          }
        }
      },
      data: [
        {
          y: 100,
          sliced: true
        },
        {
          y: 33,
          sliced: true
        }
      ]
    }
  ]
};

const InKindChart = () => {
  return (
    <div>
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  );
};

export default InKindChart;
