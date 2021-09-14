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
  let details=filterByValue (props.Details, quarter)
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={7} sm={7}>
          <Typography style={{ fontWeight: 600 }}>Assumptions</Typography>
          </Grid>
          <Grid item xs={5} sm={5}>
              <Typography style={{ fontWeight: 600 }}>High level project situation</Typography>
          </Grid>
      </Grid>
      <Grid container spacing={3}>
          <Grid item xs={7} sm={7}>
              {props["Assumptions"]}<br/><br/>
              <b>Lead government agency </b><br/>  {props["Lead government agency"]} <br/><br/>
              <b>Private sector champions </b><br/>{props["Private sector champions"]}  <br/><br/>
              <b>Other private sector support </b><br/>{props["Other private sector support"]}  <br/><br/>
              <b>Implementer </b><br/>{props["Implementer"]}<br/><br/>
              <b>Agreement </b><br/>{props["Agreement"]}
          </Grid>
          <Grid item xs={5} sm={5}>
              {details ? <ProjectSituationChart props={details} quarter={quarter}/> : ''}
          </Grid>
      </Grid>
    </div>
  );
}
