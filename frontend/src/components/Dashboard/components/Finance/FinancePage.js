import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FinanceResultTable from './Items/FinanceResultTable';
// import FinanceFilter from './Items/FinanceFilter';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import useFilteredData from '../../../../filter/useFilteredData';
// import BudgetChart from './Items/BudgetChart';
import GroupedPieChartsFinance from './Items/GroupedPieChartsFinance';
// import useRequestData from '../../hooks/useDataFilter';
// import TableFilter from '../../filter/TableFilter';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
  // remove selector with empty value


// Functions
function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}



export default function FinanceTable(props) {
    const {
    filteredData,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  } = useFilteredData(props);
 

  let portfolioTotal, inkindEstimation,totalbudget;

    const classes = useStyles();
    // Filter with dropdown
    let myLocalVar =  filteredData.data.filter(props =>
      Object.entries(filteredData.filterObj)
      .every(([k, v]) => !v.length || props[k] === v))


    
      // get all quarters
    const quaterSet = new Set();
    myLocalVar.forEach(function(value, index, array) {
      for (const item of value.Finance) {
        quaterSet.add(item.Quarter);
      }
    }); 
    let quaterArray=[]
    let currentQuarters = [...quaterSet]; // qurter dorpdown values
    if(filteredData.filterObj.Quarter){
      quaterArray=[filteredData.filterObj.Quarter]
    }else{
      quaterArray=currentQuarters
    }


  let currentProject = filterByValue (filteredData.data, filteredData.filterObj.Project)
  
    // Calculate Portfolio Total sum 
    portfolioTotal = props.seriesData.reduce(function (s, a) {
        return s + a["Project Budget"];
    }, 0);
   // Calculate In Kind Estimation
    inkindEstimation=myLocalVar.reduce(function (a, b) {
      return a +b['In-kind Estimation']; // returns object with property x
    }, 0);
    // Calculate In Kind Estimation
    totalbudget=myLocalVar.reduce(function (a, b) {
      return a +b["Project Budget"]; // returns object with property x
    }, 0);

console.log(filteredData.filterObj)



  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Filter */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="project-name">Project Name</InputLabel>
            <Select
              native
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Project',
                id: 'project-name',
              }}
            >
              <option aria-label="None" value="" />
              {projectSelect.map((project) => 
                (<option value={project}>{project}</option>)
              )} 
            </Select>
          </FormControl>
          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="quarter">Quarter</InputLabel>
            <NativeSelect
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Quarter',
                id: 'quarter',
              }}
            >
              <option aria-label="None" value="" />
              {quaterArray.sort().map((select) => 
                (<option value={select}>{select}</option>)
              )}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="project-type">Project Type</InputLabel>
            <Select
              native
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Project Type',
                id: 'project-type',
              }}
            >
              <option aria-label="None" value="" />
              {projectTypeSelect.map((type) => 
                (<option value={type}>{type}</option>)
              )} 
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Country">Country</InputLabel>
            <Select
              native
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Country',
                id: 'Country',
              }}
            >
              <option aria-label="None" value="" />
              {countrySelect.map((type) => 
                (<option value={type}>{type}</option>)
              )} 
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Status">Status</InputLabel>
            <Select
              native
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Status',
                id: 'Status',
              }}
            >
              <option aria-label="None" value="" />
              {statusSelect.map((type) => 
                (<option value={type}>{type}</option>)
              )} 
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Implementer">Implementer</InputLabel>
            <Select
              native
              value={props.seriesData.Project}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Implementer',
                id: 'Implementer',
              }}
            >
              <option aria-label="None" value="" />
              {implementerSelect.map((type) => 
                (<option value={type}>{type}</option>)
              )} 
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
      
        <Grid item xs={12}>
          {/* Table */}
          {props.seriesData ? <FinanceResultTable  data={filteredData.data}  filter={filteredData.filterObj}/> : <CircularProgress />}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            {/* <ProjectInformation/> */}
          {props.seriesData ? <GroupedPieChartsFinance portfolioTotal={portfolioTotal} props={currentProject} totalbudget={totalbudget} quarters={currentQuarters} quarter={filteredData.filterObj.Quarter} inkindEstimation={inkindEstimation}/> : <CircularProgress />}
        </Grid>
      </Grid>
    </div>
  );
}
