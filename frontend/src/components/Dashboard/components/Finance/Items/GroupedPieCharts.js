import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PieChart  from './PieChart';
import Container from '@material-ui/core/Container';

// Style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}

export default function GroupedPieCharts({portfolioTotal, props,quarter,quarters}) {
  let var_x_inkindEstimation;
  let var_x_totalbudget;
  let var_y_budget_consumed;
  let var_y_inkind_contributed;
  let temp;
    if(quarter){
      temp = filterByValue (props[0].Finance, quarter)
    }else{
      temp = filterByValue (props[0].Finance, quarters.sort().at(-1))
    }
        
    let localData = {...temp[0],...props[0]};

    var_x_totalbudget = localData["Project Budget"]
    
    // Setting variables by avoiding empty variables
    localData["In-kind Estimation"] ? var_x_inkindEstimation=localData["In-kind Estimation"] : var_x_inkindEstimation=0;
    localData["In-kind - Contributed"] ? var_y_inkind_contributed=localData["In-kind - Contributed"] : var_y_inkind_contributed=0;
    localData['Project - Consumed'] ? var_y_budget_consumed=localData['Project - Consumed'] : var_y_budget_consumed=0;
  const classes = useStyles();

  if(Number.isNaN(var_y_budget_consumed)){
    var_y_budget_consumed = 0
  }
  if(Number.isNaN(var_y_inkind_contributed)){
    var_y_inkind_contributed = 0
  }
  if(Number.isNaN(var_x_totalbudget)){
    var_x_totalbudget = 0
  }
  return (
    <div className={classes.root}>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item xs>
                    <Container className={classes.container}>
                      <Typography variant="h6" >
                        Budget
                      </Typography>
                      <Typography variant="h7"  align="left"><small>Total Budget: </small><b>{new Intl.NumberFormat().format(var_x_totalbudget)} kUSD</b><br/><small>Consumed budget: </small><b>{new Intl.NumberFormat().format(var_y_budget_consumed)} kUSD</b></Typography>
                      <PieChart type={'total budget'} var_x={var_x_totalbudget} var_y={var_y_budget_consumed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                      <Typography variant="h6" >
                        In-kind
                      </Typography>
                      <Typography variant="h7" ><small>In-Kind Estimated: </small><b>{new Intl.NumberFormat().format(var_x_inkindEstimation)} kUSD</b><br/><small>In-Kind Contributed: </small><b>{new Intl.NumberFormat().format(var_y_inkind_contributed)} kUSD</b></Typography>
                      <PieChart type={'inkind'}  var_x={var_x_inkindEstimation} var_y={var_y_inkind_contributed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                        <Typography variant="h6" >
                          Share
                        </Typography>
                        <Typography variant="h7" ><small>Total Portfolio: </small><b>{new Intl.NumberFormat().format(portfolioTotal)} kUSD</b><br/><small>Project Budget: </small><b>{new Intl.NumberFormat().format(var_x_totalbudget)} kUSD</b></Typography>
                        <PieChart type={'portfolio'}  var_x={portfolioTotal} var_y={var_x_totalbudget}/>
                    </Container>
            </Grid>
      </Grid>
    </div>
  );
}