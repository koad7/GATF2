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


export default function TimelineInDepth(props) {
props.data.sort((a, b) => a.Phase.localeCompare(b.Phase) || a['Milestone number'] -  b['Milestone number']);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Phase </TableCell>
            <TableCell></TableCell>
            <TableCell align="left">Milestone </TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Planned Date</TableCell>
            <TableCell align="left">Revised Date</TableCell>
            <TableCell align="left">Under Alliance Control</TableCell>
            <TableCell align="left">Reason for Revision</TableCell>
            <TableCell align="left">Specific Actions (if any)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row["Milestone number"]}>
              <TableCell align="left">{`${row["Phase"]}`}</TableCell>
              <TableCell component="th" scope="row">
                {`${row["Phase name"]}`}
              </TableCell>
              <TableCell align="left">{`${row["Milestone number"]}`}</TableCell>
              <TableCell align="left">{`${row["name"]}`}</TableCell>
              <TableCell align="left">{moment.unix(row.start/1000).format('LL')}</TableCell>
              <TableCell align="left">{row.revisedDate}</TableCell>
              <TableCell align="left">{row['Under Alliance control']}</TableCell>
              <TableCell align="left">{row['Reason for revision']}</TableCell>
              <TableCell align="left">{row['Specific Actions']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}