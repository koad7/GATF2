import React from "react";
import Grid from '@material-ui/core/Grid';
import ReactApexChart from "react-apexcharts";




function BudgetChart() {
  const budget_series = [4567, 1853];
  const inkind_series = [457, 1853];
 
  const project_budget_chart_options = {
    options: {},
    theme: {
      monochrome: {
        enabled: true
      }
    },
    labels: ['Budget', 'Consumed'],
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

  const inKind_budget_chart_options = {
    options: {},
    theme: {
      monochrome: {
        enabled: true
      }
    },
    labels: ['Estimated', 'Contributed'],
    dataLabels: {
      showOn: "always",
      name: {
        show: true,
        color: ['#CEE2FA', '#81ADE0'],
        fontSize: "13px"
      }
    },
    // fill: {
    //   colors: ['#CEE2FA', '#81ADE0']
    // },
    legend: {
      position: 'bottom'
    }
  }


  return (

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h2>Project Budget</h2>            
          <ReactApexChart
              options={project_budget_chart_options}
              series={budget_series}
              type="donut"
              height={350}
            />
        </Grid>
        <Grid item xs={6}>
          <h2>In-Kind</h2>
            <ReactApexChart
              options={inKind_budget_chart_options}
              series={inkind_series}
              type="donut"
              height={350}
            />
        </Grid>
      </Grid>
  );
}

export default BudgetChart;
