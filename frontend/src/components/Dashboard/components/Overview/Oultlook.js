import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    overlookText: {
      textAlign: "left ! important",
      color: "black"
    },
    table:{
      fontSize: 12,
      color: "red"
    }
  }));
  // Filtering function
  function  filterByValue (array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].includes(string)));
  }
  
// Main function
export default function Outlook({props,quarters}) {
  const classes = useStyles();
  let outlookText;
  let toBeMonitored;
  let nextstep;
  outlookText=props[0]['Overall Outlook'];
  toBeMonitored=props[0]['To be monitored'];
  const nextstepquartersSet = new Set();
  for (let i = 0; i < props[0].NextSteps.length; i++){
    nextstepquartersSet.add( props[0].NextSteps[i]["Quarter"]);
  }
  let nextstepquarters=[...nextstepquartersSet]
 if(quarters){
    console.log(props);
    console.log(quarters);
    console.log(nextstepquarters);
    if (nextstepquarters.includes(quarters)){
      nextstep=filterByValue (props[0].NextSteps, quarters.sort().at(-1))
    }else{
      nextstep=filterByValue (props[0].NextSteps, nextstepquarters.sort().at(-1));
    }
 }
  else {
    nextstep=null;
  
  } 
  
  return (
    <div className={classes.root}>
      <Grid item lg={12} className={classes.overlookText}>
        {outlookText ?  <><b>OVERALL OUTLOOK</b> <br/>  {outlookText}</> : '' }
        <br/>
          {toBeMonitored ?  <><b>TO BE MONITORED</b> <br/> {toBeMonitored}</> : '' }
        <br/>
        {nextstep ?
          <>
              <b style={{color:'black'}}>NEXT STEPS</b> 
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