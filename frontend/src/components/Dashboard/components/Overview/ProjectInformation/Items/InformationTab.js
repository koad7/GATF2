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


export default function InformationTab({props}) {
  const classes = useStyles();
  let tfaArticles='';
  let excpectedResult='';
  let scope='';
  try{
    tfaArticles=props[0]['TFA Articles'];
    scope=props[0]["Scope"];
    excpectedResult=props[0]['Expected Result'];
    }catch(error){
      tfaArticles='';
      scope='';
      excpectedResult='';
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
