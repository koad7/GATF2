import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart  from './PieChart';
// import ReactApexChart from "react-apexcharts";
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}
    

export default function GroupedPieCharts({portfolioTotal, props,quarter}) {
  
  let localQuarter;
  // Set localQuarter value.
  props.filterObj.Quarter ? localQuarter = props.filterObj.Quarter : localQuarter = quarter.sort().at(-1);

  let var_x_inkindEstimation;
  let var_x_totalbudget;
  let initialData = props.data
  let out={data: ''}
  let var_y_budget_consumed;
  let var_y_inkind_contributed;
  

  try{
    
    //initialData.forEach(function(v){ delete v.Quarter }) // Delete Quarter from the main Object
    let internal1={data: ''}
    let internal2={data: ''}
    internal1.data  = initialData.map(x=> ({ ...x,...x.Finance[0]})); // Merge Finacne data to the main data
    
    internal2.data=props.data.map(x=> ({ ...x,...filterByValue (x.Finance, localQuarter)[0]}));
    // internal2.data = internal1.data.map(x=> ({...x, ...x.Finance[0]}))   // Merge Fianance Objects with the main Objects

    

    if(props.filterObj.Project){
      out.data = internal2.data.filter(item =>
        Object.entries(props.filterObj)
        .every(([k, v]) => !v.length || item[k] === v));// Final Output data 
        console.log(out.data)

    }else{
      out.data = [internal2.data[0]]
      console.log(out.data)
    }
    

    var_x_totalbudget = out.data.reduce(function (s, a) {
      let tmp;
      if(parseInt(a["Project Budget"])){
        tmp=parseInt(a["Project Budget"])
      }else{
        tmp=0
      }
        return s + tmp;
      }, 0);
    var_x_inkindEstimation = out.data.reduce(function (s, a) {
      let tmp;
      if(parseInt(a["In-kind Estimation"])){
        tmp=parseInt(a["In-kind Estimation"])
      }else{
        tmp=0
      }
        return s + tmp;
      }, 0);
    var_y_inkind_contributed = out.data.reduce(function (s, a) {
      let tmp;
      if(parseInt(a["In-kind - Contributed"])){
        tmp=parseInt(a["In-kind - Contributed"])
      }else{
        tmp=0
      }
        return s + tmp;
      }, 0);

    var_y_budget_consumed = out.data.reduce(function (s, a) {
      let tmp;
      if(parseInt(a['Project - Consumed'])){
        tmp=parseInt(a['Project - Consumed'])
      }else{
        tmp=0
      }
        return s + tmp;
      }, 0);
    
  }catch(error){
    out.data = props.data
  }
  

  

 
    // let currData; // If no Quarter is selected choose the first data in Finance
    // if(quarter){
    //   currData= filterByValue(props.data, quarter)
    // }else{
    //   currData= props.data
    // }
   

    // const inKindContribution= props.reduce((total, obj) => obj.inKindContributed + total,0)
        // const var_x_inKindEstimation=props.reduce((total, obj) => obj.inKindEstimated + total,0)
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item xs>
                    <Container className={classes.container}>
                        <Typography variant="h6" gutterBottom>
                            Budget
                        </Typography>
                    
                    <Typography variant="h2" gutterBottom>
                    </Typography>
                    <PieChart type={'total budget'} var_x={var_x_totalbudget} var_y={var_y_budget_consumed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                        <Typography variant="h6" gutterBottom>
                            In-kind
                        </Typography>
                    
                    <Typography variant="h2" gutterBottom>
                    </Typography>
                    <PieChart type={'inkind'}  var_x={var_x_inkindEstimation} var_y={var_y_inkind_contributed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                        <Typography variant="h6" gutterBottom>
                        Perct. of Portfolio
                        </Typography>
                    </Container>
                    <PieChart type={'portfolio'}  var_x={portfolioTotal} var_y={var_x_totalbudget}/>
            </Grid>
      </Grid>
    </div>
  );
}