import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow:'scroll',
      display:'block',
      height: 250,
      zIndex: 5,
      backgroundColor: theme.palette.background.paper,
    },
    details: {
        display: 'flex'
    },
    overlookText: {
      textAlign: "left ! important",
      color: "black"
    },
    table:{
      fontSize: 12,
      color: "red"
    }
  }));

  function  filterByValue (array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
  }
  


export default function Outlook({props}) {
  const classes = useStyles();
  let initialData={data: ''}
  let outlookText;
  let toBeMonitored;
  let out={data: ''}
  initialData.data = props.data;
  let nextstep=null;

if(props.filterObj.Project){
  try{
    out.data = initialData.data.filter(item=> item.Project === props.filterObj.Project)
    outlookText=out.data[0]['Overall Outlook'];
    toBeMonitored=out.data[0]['To be monitored'];
  }catch(error){
    out.data=initialData.data[0]
  }
  // Quarter filtering of NextSteps
  if(props.filterObj.Quarter){
    try{
      nextstep=filterByValue (out.data[0].NextSteps, props.filterObj.Quarter)
    }catch(error){ 
      nextstep=null
    }
  }
}else{
  out.data = initialData.data[0]
  outlookText=out.data['Overall Outlook'];
  toBeMonitored=out.data['To be monitored'];
  // Quarter filtering of NextSteps
  if(props.filterObj.Quarter){
    try{
      nextstep=filterByValue (out.data.NextSteps, props.filterObj.Quarter)
    }catch(error){ 
      nextstep=null
    }
  }
}

return (
  <div className={classes.root}>
          <Grid item lg={12} className={classes.overlookText}>
            {outlookText ?  <><b>Overall Outlook</b> <br/>  {outlookText}</> : '' }
            <br/>
            {toBeMonitored ?  <><b>To be monitored</b> <br/> {toBeMonitored}</> : '' }
            <br/>
            {nextstep ?
            <>
                <b style={{color:'black'}}> Next steps</b> 
              <Grid item xs>
                  <Table className={classes.table} stickyHeader size="small" aria-label="sticky table" >
                      <TableHead>
                        <TableRow>
                          <TableCell>Deadline</TableCell>
                          <TableCell>Next step</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {nextstep.map(a =>
                        <TableRow className={classes.table}>
                          <TableCell align="left" >{a.Deadline}</TableCell>
                          <TableCell align="left" >{a['Next step']}</TableCell>
                          <TableCell align="left" >{a.Status}</TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
              </Grid>
            </>
            : ''}
        </Grid>
      </div>
  );
}