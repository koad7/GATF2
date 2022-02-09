import React  from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";




const  PieChart= ({type, var_x, var_y}) => {

  if(Number.isNaN(var_x)){
    var_x = 0
  }
  if(Number.isNaN(var_y)){
    var_y = 0
  }


let dataValue = [];
let color=[];
if(type==='total budget') {
    dataValue = [
        ["Consumed", var_y],
        ["Budget", (var_x-var_y)],
    ];
    color=['#00833e', '#a2d45e'];
}  else if(type==='inkind') {
    dataValue = [
        ["Contributed", (var_y)],
        ["Remaining Estimated", (var_x-var_y)],
    ];
    color=['#3288ED', '#84B8F4'];
}else if(type==='portfolio'){
    dataValue = [
        ["Project Budget", (var_y)],
        ["Portfolio", (var_x-var_y)]];
        color=['#3f4643', '#ff8300'];
}
  const chartOptions = {
    series: [
      {
        data: dataValue,
        name: "",
      }
    ],
    chart: {
        type: 'pie',
        margin: [0, 0, 0, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0
    },
    credits: {
      enabled: false
  },
    title: {
        text: ""
      },
    plotOptions: {
      pie: {
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f} kUSD</b> <br/>'
          },
        size: "40%",
        allowPointSelect: true,
        colors: color,
        cursor: "pointer",
        depth: 10,
        innerSize: 60,
        dataLabels: {
            format: '{point.percentage:.0f} %'
        },
        showInLegend: true
      },
      
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} onetoOne={true} />
    </div>
  );
};
export default PieChart;
