import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableCell:{
    backgroundColor: 'rgb(137,137,135)',
    color:'white'
  }
});

// Row coloring
let rowColor={'Completed':'#8bc34a','Dates pending':'#c2c1c1de','In progress':'#ffffff' }

export default function TimelineInDepth(props) {
  
let seenNames = {};
// Sort by Milestone number and by quarter then filter out the older quarter of same Milestone  
let arrFiltered = props.data.sort(function(a, b) {
  return  parseInt(a['Milestone number']) - parseInt(b['Milestone number']) || b['Quarter'].localeCompare(a['Quarter']) ; //Get highest quarte
}).filter(function(currentObject) {
  if (currentObject.name in seenNames) {
      return false;
  } else {
      seenNames[currentObject.name] = true;
      return true;
  }
})


  const classes = useStyles();
  return (
      <TableContainer  className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow style={{ backgroundColor: 'rgb(137,137,135)', color:'white'}}>
              <TableCell className={classes.tableCell} align="left">Phase </TableCell>
              <TableCell className={classes.tableCell}></TableCell>
              <TableCell className={classes.tableCell} align="left">Milestone </TableCell>
              <TableCell className={classes.tableCell} align="left"></TableCell>
              <TableCell className={classes.tableCell} align="left">Planned Date</TableCell>
              <TableCell className={classes.tableCell} align="left">Revised Date</TableCell>
              <TableCell className={classes.tableCell} align="left">Reason for Revision</TableCell>
              <TableCell className={classes.tableCell} align="left">Specific Actions</TableCell>
              <TableCell className={classes.tableCell} align="left">Status</TableCell>
              <TableCell className={classes.tableCell} align="left">Quarter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrFiltered.map((row) => (
              <TableRow  style={{ backgroundColor: rowColor[row["Status"]]}}  key={row["Milestone number"]}>
                <TableCell align="left"><b>{`${row["Phase"]}`}</b></TableCell>
                <TableCell component="th" scope="row">
                <small>{`${row["Phase name"]}`}</small>
                </TableCell>
                <TableCell align="left"><b>{`${row["Milestone number"]}`}</b></TableCell>
                <TableCell align="left"><small>{`${row["name"]}`}</small></TableCell>
                <TableCell align="left"><small>{row['planned_date']}</small></TableCell>
                <TableCell align="left"><small>{row['Revised date']  }</small></TableCell>
                <TableCell align="left"><small>{row['Reason for revision']}</small></TableCell>
                <TableCell align="left"><small>{row['Specific Actions']}</small></TableCell>
                <TableCell align="left"><small>{row['Status']}</small></TableCell>
                <TableCell align="left"><small>{row['Quarter']}</small></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
  );
}
           