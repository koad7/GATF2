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

function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}
            


export default function DetailTab({props}) {
  
  const classes = useStyles();
  let initialData={data: ''}
  let out={data: ''}
  initialData.data = props.data;
  let details=null;
  let leadGovAgency='';
  let privateChampions='';
  let privateSupport='';
  let assumptions='';
  let implementer='';
  let agreement ='';
if(props.filterObj.Project){
  try{
    out.data = initialData.data.filter(item=> item.Project === props.filterObj.Project)
    leadGovAgency=out.data[0]["Lead government agency"];
    assumptions=out.data[0]["Assumptions"];
    privateChampions=out.data[0]["Private sector champions"];
    privateSupport=out.data[0]["Other private sector support"];
    implementer=out.data[0]["Implementer"];
    agreement=out.data[0]["Agreement"];
  }catch(error){
    out.data=initialData.data[0]
  }
  // Quarter filtering of NextSteps
  if(props.filterObj.Quarter){
    try{
      details=filterByValue (out.data[0].Details, props.filterObj.Quarter)
    }catch(error){ 
      details=''
    }
  }
}
else{
  out.data = initialData.data[0]
  leadGovAgency=out.data["Lead government agency"];
  assumptions=out.data["Assumptions"];
  privateChampions=out.data["Private sector champions"];
  privateSupport=out.data["Other private sector support"];
  implementer=out.data["Implementer"];
  agreement=out.data["Agreement"];
  // Quarter filtering of NextSteps
  if(props.filterObj.Quarter){
    try{
      details=filterByValue (out.data.Details, props.filterObj.Quarter)
    }catch(error){ 
      details=''
    }
  }
}

  
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
              {assumptions}<br/><br/>
              <b>Lead government agency </b><br/>  {leadGovAgency} <br/><br/>
              <b>Private sector champions </b><br/>{privateChampions}  <br/><br/>
              <b>Other private sector support </b><br/>{privateSupport}  <br/><br/>
              <b>Implementer </b><br/>{implementer}<br/><br/>
              <b>Agreement </b><br/>{agreement}
          </Grid>
          <Grid item xs={5} sm={5}>
              {details ? <ProjectSituationChart props={details} quarter={props.filterObj.Quarter}/> : ''}
          </Grid>
      </Grid>
      
    </div>
  );
}
