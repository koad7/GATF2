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
      nextstep=''
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
      nextstep=''
    }
  }
}

return (
  <div className={classes.root}>
          <Grid item lg={12}>
            {outlookText ? <Typography variant="h6" align='left'> <b style={{color:'black'}}>Overall Outlook</b> <br/> {outlookText} </Typography> : '' }
            <br/>
            {toBeMonitored ? <Typography variant="h6" align='left'> <b style={{color:'black'}}>To be monitored</b> <br/> {toBeMonitored} </Typography> : '' }
            <br/>
            {nextstep ?
            <>
              <Typography variant="h6" align='left'>
                <b style={{color:'black'}}> {nextstep ? "Next steps" : ""}</b> 
              </Typography>
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
                        <TableRow>
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