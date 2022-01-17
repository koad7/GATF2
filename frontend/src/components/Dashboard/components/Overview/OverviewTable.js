import React from "react";
import ProjectInformation from './ProjectInformation/ProjectInformation'
import Timelines from './Timeline/Timelines';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RiskChartFusion from './Risk/RiskChartFusion'
import GroupedPieCharts from '../Finance/Items/GroupedPieCharts';
import useFilteredData from '../../../../filter/useFilteredData';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Outlook from './Outlook';

// DataFilterContext

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },chart: {
    padding: theme.spacing(2),
    textAlign: 'center',
    
  },
  circular: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  }
}));
// Functions
function  filterByValue (array, string) {
  return array.filter(o =>
      Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
}


export default function OverviewTable(props) {

  const classes = useStyles();
  const {
    filteredData,
    projectSelect,
    handleFilterSelected
  } = useFilteredData(props);
  //**************Filtering 
  // Get selected Project: currentProject
  let currentProject = filterByValue (filteredData.data, filteredData.filterObj.Project)
  // Get quarters in selected project
  const quarterSet = new Set();
  let quarterArray=[]
  currentProject.forEach(function(value, index, array) {
    for (const item of value.Finance) {
      quarterSet.add(item.Quarter);
    }
    for (const item of value.Risks) {
      quarterSet.add(item.Quarter);
    }
    for (const item of value.Milestones) {
      quarterSet.add(item.Quarter);
    }
    for (const item of value.NextSteps) {
      quarterSet.add(item.Quarter);
    }
  }); 

  let currentQuarters = [...quarterSet]; // quarter dropdown values
  if(filteredData.filterObj.Quarter){
    quarterArray=[filteredData.filterObj.Quarter]
  }else{
    quarterArray=currentQuarters
  }
  let portfolioTotal, inkindEstimation;
  let textcolor='darkgrey'
  
    // Calculate Portfolio Total sum and  inkindEstimation
    if (props){
      portfolioTotal = props.seriesData.reduce(function (s, a) {
          return s + a["Project Budget"];
      }, 0);
      inkindEstimation= filteredData.data[0]['In-kind Estimation']
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
                value={props.seriesData.Project ? props.seriesData.Project :currentProject[0].Project}
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
                }}>
                <option aria-label="None" value="" />
                {currentQuarters.sort().reverse().map((select) => 
                  (<option value={select}>{select}</option>)
                )} 
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Grid container spacing={3}>
            <Grid item xs={12}> 
            {
              filteredData.filterObj.Project 
              ?
              <Typography variant="h4" gutterBottom align='left'>
                {filteredData.filterObj.Project}        {filteredData.filterObj.Quarter? "- " + filteredData.filterObj.Quarter: '___________'}
              </Typography> 
              :
              <Typography variant="h4" gutterBottom align='left'>
                {currentProject[0].Project}
              </Typography>
            }
            </Grid>
        </Grid> */}
      {props.seriesData ? <>
        <Grid container spacing={3}>
            <Grid item xs={12}>  
            <Typography style={{ color: textcolor }} variant="h5">OUTLOOK</Typography>        
              <Paper className={classes.paper}>
                <Outlook key={12}  props={currentProject} quarters={quarterArray} />
              </Paper>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProjectInformation props={currentProject} quarters={quarterArray}/> 
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{backgroundColor: 'white'}} >
          <Grid item xs={7}>
            <Typography style={{ color: textcolor }} variant="h5">FINANCE</Typography>
            <>
              <Grid container spacing={3}>
                <GroupedPieCharts portfolioTotal={portfolioTotal} props={currentProject} totalbudget={filteredData.data[0]["Project Budget"]} quarters={currentQuarters} quarter={filteredData.filterObj.Quarter} inkindEstimation={inkindEstimation}/> 
              </Grid>
            </>
          </Grid>
          <Grid item xs={5}>
            <Typography style={{ color: textcolor }} variant="h5">CONTEXTUAL RISKS</Typography>
            <br/>
              <RiskChartFusion props={currentProject[0].Risks} quarter={filteredData.filterObj.Quarter}/> 
          </Grid>
        </Grid>
        <br/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography style={{ color: textcolor }} variant="h5">TIMELINE</Typography>
              <Timelines props={filteredData} quarter={currentQuarters}/> 
          </Grid>
         
        </Grid>  </> : <div className={classes.circular}><CircularProgress /></div>}
       
      </div>
    );
}