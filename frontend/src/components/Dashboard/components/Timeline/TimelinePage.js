
import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import useRequestData from '../../hooks/useDataFilter';
// import TableFilter2 from '../../filter/TableFilter';
import TimelineChart from "./Items/TimelineChart"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
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
    setSelected,
    projectSelect,
    projectTypeSelect,
    implementerSelect,
    yearSelect,
    countrySelect,
    statusSelect,
    handleFilterSelected
  } = useFilteredData(props);
  
  
  const classes = useStyles();

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
              value={props.seriesData.Quarter}
              onChange={handleFilterSelected}
              inputProps={{
                name: 'Quarter',
                id: 'quarter',
              }}
            >
              <option aria-label="None" value="" />
              {yearSelect.map((select) => 
                (<option value={select}>{select}</option>)
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <TimelineChart seriesData={filteredData.data}/>
      
    </div>
  );
};

