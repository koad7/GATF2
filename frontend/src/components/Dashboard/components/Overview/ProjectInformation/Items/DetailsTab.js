import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ProjectSituationChart from './ProjectSituationChart'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
//Filtering function
function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}
export default function DetailTab({props,quarter}) {
  const classes = useStyles();
  
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={7} sm={7}>
          <Typography style={{ fontWeight: 600 }}>DETAILS</Typography>
          </Grid>
          <Grid item xs={5} sm={5}>
              <Typography style={{ fontWeight: 600 }}>HIGH LEVEL PROJECT SITUATION</Typography>
          </Grid>
      </Grid>
      <Grid container spacing={3}>
          <Grid item xs={7} sm={7}>
              <b>ASSUMPTIONS </b><br/>{props["Assumptions"]}<br/><br/>
              <b>LEAD GOVERNMENT AGENCY </b><br/>  {props["Lead government agency"]} <br/><br/>
              <b>PRIVATE SECTOR CHAMPIONS </b><br/>{props["Private sector champions"]}  <br/><br/>
              <b>OTHER PRIVATE SECTOR SUPPORT </b><br/>{props["Other private sector support"]}  <br/><br/>
              <b>IMPLEMENTER </b><br/>{props["Implementer"]}<br/><br/>
              <b>AGREEMENT </b><br/>{props["Agreement"]}
          </Grid>
          <Grid item xs={5} sm={5}>
              {props.Details ? <ProjectSituationChart props={props.Details} quarter={quarter}/> : ''}
          </Grid>
      </Grid>
    </div>
  );
}
