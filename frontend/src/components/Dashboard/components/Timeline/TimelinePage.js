
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
// import useRequestData from '../../hooks/useDataFilter';
// import TableFilter2 from '../../filter/TableFilter';
import TimelineChart from "./Items/TimelineChart"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import useFilteredData from '../../../../filter/useFilteredData';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function TimelinePage(props){

  const {
    filteredData,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  } = useFilteredData(props);

  let chartData = filteredData.data.filter(l =>Object.entries(filteredData.filterObj).every(([k, v]) => !v.length || l[k] === v));
  const classes = useStyles();
  console.log(chartData)
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
      <TimelineChart seriesData={chartData} />
    </div>
  );
};

