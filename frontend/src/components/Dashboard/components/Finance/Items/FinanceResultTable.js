import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    { id: 'Project', label: 'Project', minWidth: 170, align: 'right' },
    { id: 'Project Type', label: 'Project Type', minWidth: 130, align: 'right' },
    { id: 'Implementer', label: 'Implementer', minWidth: 100, align: 'right' },
    { id: 'Project Budget', label: 'Project Budget', minWidth: 80, align: 'right'},
    { id: 'Project - Consumed', label: 'Project - Consumed', minWidth: 80, align: 'right'},
    { id: 'In-kind Estimation', label: 'Estimated In Kind', minWidth: 80, align: 'right'},
    { id: 'In-kind - Contributed', label: 'In-kind - Contributed', minWidth: 80, align: 'right'},
    { id: 'Quarter', label: 'Quarter', minWidth: 70, align: 'right' },
    { id: 'Country', label: 'Country', minWidth: 80, align: 'right'},
    { id: 'Status', label: 'Status', minWidth: 100, align: 'right'}
  ];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    container: {
      height: 440,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
export default function FinanceResultTable(props) {

let initialData = props.data
let out={data: ''}

try{
  initialData.forEach(function(v){ delete v.Quarter }) // Delete Quarter from the main Object
  let internal1={data: ''}
  let internal2={data: ''}
  internal1.data = initialData.map(x=> ({...x, Finance: x.Finance.filter(y=> y.Quarter === props.filter.Quarter)})) // Filter Finance data with Quarter
  internal2.data = internal1.data.map(x=> ({...x, ...x.Finance[0]}))   // Merge Fianance Objects with the main Objects
  out.data = internal2.data.filter(item =>
    Object.entries(props.filter)
    .every(([k, v]) => !v.length || item[k] === v));// Final Output data 
}catch(error){
  out.data = props.data
}




    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table"  >
            <TableHead>
              <TableRow style={{ backgroundColor: 'rgb(92,93,90)'}}>
                {columns.map((column) => (
                  <TableCell style={{ backgroundColor: 'rgb(137,137,135	)', minWidth: column.minWidth, color:'white'}}
                    key={column.id}
                    align="left"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {out.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={out['data'].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }