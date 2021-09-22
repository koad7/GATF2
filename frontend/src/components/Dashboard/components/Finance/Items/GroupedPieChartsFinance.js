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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



export default function GroupedPieChartsFinance({portfolioTotal , inkindEstimation ,inkindContributed , totalbudget,consumedbudget}) {
  let var_x_inkindEstimation=inkindEstimation;
  let var_x_totalbudget=totalbudget;
  let var_y_budget_consumed=consumedbudget;
  let var_y_inkind_contributed=inkindContributed;
  
 
  const classes = useStyles();
  console.log("var_y_budget_consumed")
  console.log(new Intl.NumberFormat().format(var_y_budget_consumed))
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
                      <Typography variant="h6" gutterBottom>
                        Budget
                      </Typography>
                      <Typography variant="h7" gutterBottom>Total Budget: <b>{new Intl.NumberFormat().format(var_x_totalbudget)} kUSD</b><br/> Consumed budget: <b>{new Intl.NumberFormat().format(var_y_budget_consumed)} kUSD</b></Typography>
                      <PieChart type={'total budget'} var_x={var_x_totalbudget} var_y={var_y_budget_consumed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                      <Typography variant="h6" gutterBottom>
                        In-kind
                      </Typography>
                      <Typography variant="h7" gutterBottom>In-Kind Estimated: <b>{new Intl.NumberFormat().format(var_x_inkindEstimation)} kUSD</b><br/> In-Kind Contributed: <b>{new Intl.NumberFormat().format(var_y_inkind_contributed)} kUSD</b></Typography>
                      <PieChart type={'inkind'}  var_x={var_x_inkindEstimation} var_y={var_y_inkind_contributed}/>
                    </Container>
            </Grid>
            <Grid item xs>
                    <Container className={classes.container}>
                        <Typography variant="h6" gutterBottom>
                          Share
                        </Typography>
                        <Typography variant="h7" gutterBottom>Total Portfolio: <b>{new Intl.NumberFormat().format(portfolioTotal)} kUSD</b><br/> Project Budget: <b>{new Intl.NumberFormat().format(var_x_totalbudget)} kUSD</b></Typography>
                        <PieChart type={'portfolio'}  var_x={portfolioTotal} var_y={var_x_totalbudget}/>
                    </Container>
            </Grid>
      </Grid>
    </div>
  );
}