import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    align: 'left'
  },
});

let rowColor={1: 'rgb(201,	216,	208)	', 2:'rgb(241,247,237	)', 3:'rgb(248,229,204	)', 4:'rgb(196,196,194	)',5:'rgb(238,244,250	)', 6:'rgb(202,214,238	)',7:'violet'}
export default function TimelineInDepth(props) {
// SOrt by Milestone only
props.data.sort(function(a, b) {
  return a['Milestone number'] -  b['Milestone number'];
});

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table   className={classes.table} size="small" >
        <TableHead >
          <TableRow  style={{ backgroundColor: 'rgb(137,137,135	)', color:'white'}}>
            <TableCell style={{ color:'white'}} align="left">Phase </TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color:'white'}} align="left">Milestone </TableCell>
            <TableCell style={{ color:'white'}} align="left"></TableCell>
            <TableCell style={{ color:'white'}} align="left">Planned Date</TableCell>
            <TableCell style={{ color:'white'}} align="left">Revised Date</TableCell>
            <TableCell style={{ color:'white'}} align="left">Reason for Revision</TableCell>
            <TableCell style={{ color:'white'}} align="left">Specific Actions (if any)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow  style={{ backgroundColor: rowColor[row["Phase"]]}}  key={row["Milestone number"]}>
              <TableCell align="left"><b>{`${row["Phase"]}`}</b></TableCell>
              <TableCell component="th" scope="row">
                {`${row["Phase name"]}`}
              </TableCell>
              <TableCell align="left"><b>{`${row["Milestone number"]}`}</b></TableCell>
              <TableCell align="left">{`${row["name"]}`}</TableCell>
              {/* Remove the possibility of having: January 1, 1970  */}
              <TableCell align="left"><small>{moment.unix(row.start/1000).format('LL') !== 'January 1, 1970' ? moment.unix(row.start/1000).format('LL'): ''}</small></TableCell>
              <TableCell align="left"><small>{moment.unix(row.start/1000).format('LL') !== 'Invalid date' ? '': moment.unix(row.revisedDate/1000).format('LL')}</small></TableCell>
              <TableCell align="left">{row['Reason for revision']}</TableCell>
              <TableCell align="left">{row['Specific Actions']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}