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
import GroupedPieCharts from './Items/GroupedPieCharts';
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







export default function FinanceTable(props) {

  const {
    filteredData,
    setSelected,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    // yearSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  } = useFilteredData(props);
  console.log(props)

  let portfolioTotal, inkindEstimation, projectBudget;

  if (props.seriesData){
        portfolioTotal = props.seriesData.reduce(function (s, a) {
            return s + a["Project Budget"];
        }, 0);
        try{
          inkindEstimation= filteredData.data[0]['In-kind Estimation']
        }catch(error){
          inkindEstimation=''
        }
        try{
          projectBudget=filteredData.data[0]["Project Budget"]
        }catch(error){
          projectBudget=''
        }
        
      }

    const classes = useStyles();

    let financeData;
    let financeQuarter=[];
    let financeQuarterSelect ;
    try{
      financeData=filteredData.data[0].Finance;
      financeData.forEach(x => {
        financeQuarter.push(x["Quarter"]);
     })
     financeQuarterSelect = [...new Set(financeQuarter)].sort().filter(function (el) {return el !== "";});
    }catch(error){
      financeData=[]
    }
    
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
              {financeQuarterSelect.sort().map((select) => 
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
          {props.seriesData ? <GroupedPieCharts portfolioTotal={portfolioTotal}  totalbudget={projectBudget}  inkindEstimation={inkindEstimation} props={filteredData}/> : <CircularProgress />}
        </Grid>
      </Grid>
    </div>
  );
}
