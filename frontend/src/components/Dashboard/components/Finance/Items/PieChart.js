import React from "react";
import ReactApexChart from "react-apexcharts";





export default  function PieChart({type, var_x, var_y}) {
  //type: help to differentiate the type of chart (Budget, Inkind or Portfolio)
  // var_x: is 1st dimmension 
  // var_y: is 2nd dimmension  

  let  chartOption;
  let series={};

  
  const project_consumed_budget_chart_options = {
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        show: false,
                        label: 'Project Budget',
                        formatter: () => var_x    
                    }
                }
            }
        }
    },
      theme: {
          monochrome: {
              enabled: false
          }
      },
      labels: ['Consumed', 'Remaining'],
      dataLabels: {
      showOn: "always",
          name: {
              show: true,
              color: ['#3288ED', '#84B8F4'],
              fontSize: "15px"
          }
      },
      // fill: {
      //   colors: ['#3288ED', '#84B8F4']
      // },
      legend: {
      position: 'bottom'
      }
  }
  const in_kind_chart_options = {
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        show: false,
                        label: 'Total',
                        formatter: () => var_x ? var_x + " kUSD" : ''
                        
                    }
                }
            }
        }
    },
      theme: {
          monochrome: {
              enabled: true
          }
      },
      labels: ['Contributed', 'Estimated'],
      dataLabels: {
      showOn: "always",
          name: {
              show: true,
              color: ['#3288ED', '#84B8F4'],
              fontSize: "20px"
          }
      },
      // fill: {
      //   colors: ['#3288ED', '#84B8F4']
      // },
      legend: {
      position: 'bottom'
      }
  }
  const portfolio_chart_options = {
    plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Portfolio',
                            formatter: () => var_x
                        }
                    }
                }
            }
    },
    theme: {
        monochrome: {
            enabled: true
        }
    },
    labels: ['Project Budget', 'Total Portfolio'],
    dataLabels: {
    showOn: "always",
        name: {
            show: true,
            color: ['#3288ED', '#84B8F4'],
            fontSize: "20px"
        }
    },
    // fill: {
    //   colors: ['#3288ED', '#84B8F4']
    // },
    legend: {
        position: 'bottom'
      }
  }
  if(type==='total budget'){
      chartOption = project_consumed_budget_chart_options
  }
  else if(type==='inkind'){
      chartOption = in_kind_chart_options
  }else if(type==='portfolio'){
      chartOption = portfolio_chart_options
  }


  if(typeof var_y === 'undefined' || typeof var_x === 'undefined') {
    series=[]
  }else{
    series=[var_y, (var_x-var_y)]
  }

  return (
      <ReactApexChart
          options={chartOption}
          series={series}
          type="donut"
          height={250}
      />
  );
}
