import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 'min-content',
  },
  container: {
    maxHeight: 100,
  },
});

function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}
            


export default function InformationTab({props}) {
  
  const localVar = {...props.data}
  const classes = useStyles();
  

  let initialData={data: ''}
  let out={data: ''}
  initialData.data = props.data;
  let details=null;
  let tfaArticles='';
  let excpectedResult='';
  let scope='';

if(props.filterObj.Project){
  try{
    out.data = initialData.data.filter(item=> item.Project === props.filterObj.Project)
    tfaArticles=out.data[0]['TFA Articles'];
    scope=out.data[0]["Scope"];
    excpectedResult=out.data[0]['Expected Result'];
  }catch(error){
    out.data=initialData.data[0]
  }

}
else{
  out.data = initialData.data[0]
  tfaArticles=out.data['TFA Articles'];
  scope=out.data["Scope"];
  excpectedResult=out.data['Expected Result'];
}



  return (
    <div className={classes.root}>
      <Grid container spacing={3} >
            <Grid item xs>
            <Typography style={{ fontWeight: 600 }}>Scope</Typography>
            </Grid>
            <Grid item xs>
                <Typography style={{ fontWeight: 600, align: 'right' }}>Expected Result</Typography>
            </Grid>
            <Grid item xs>
            <Typography style={{ fontWeight: 600 }}>TFA Articles</Typography>
            </Grid>
        </Grid>
      <Grid container spacing={3}>
            <Grid item xs>
                {scope}
            </Grid>
            <Grid item xs>
                {excpectedResult} <br/>
            </Grid>
            <Grid item xs>
                <Table className={classes.table} stickyHeader size="small" aria-label="sticky table" >
                <TableHead>
                  <TableRow>
                    <TableCell>Articles</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Categories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tfaArticles.map(a =>
                  <TableRow>
                    <TableCell align="left" >{a.split("|")[0].trim()}</TableCell>
                    <TableCell align="left" >{a.split("|")[1].trim()}</TableCell>
                    <TableCell align="left" >{a.split("|")[2].trim()}</TableCell>
                  </TableRow>)}
                </TableBody>
              </Table>
            </Grid>
        </Grid>
  </div>
  );
}
