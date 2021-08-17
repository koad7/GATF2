import React,{ useContext } from "react";
import ProjectInformation from './ProjectInformation/ProjectInformation'
// import TimelineChart from '../Timeline/Items/TimelineChart'
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
import Oultlook from './Oultlook'
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
}));

export default function OverviewTable(props) {
  const classes = useStyles();
  const {
    filteredData,
    projectSelect,
    yearSelect,
    handleFilterSelected
  } = useFilteredData(props);

console.log(filteredData.data)

  let portfolio, inkindEstimation;
  let textcolor='darkgrey'

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


  // Calculate Portfolio Total sum
  if (props){
    portfolio = props.seriesData.reduce(function (s, a) {
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
              <option aria-label="2020.Q4">2020.Q4</option>
              <option aria-label="2021.Q1">2021.Q1</option>
              <option aria-label="2021.Q2">2021.Q2</option>
              <option aria-label="2021.Q3">2021.Q3</option>
              <option aria-label="2021.Q4">2021.Q4</option>
              {/* {yearSelect.map((select) => 
                (<option value={select}>{select}</option>)
              )} */}
              {/* <option value="2021.Q3">2021.Q3</option> */}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
    {props.seriesData ? <>
      <Grid container spacing={3}>
          <Grid item xs={12}>  
          <Typography style={{ color: textcolor }} variant="h5">OUTLOOK</Typography>        
            <Paper className={classes.paper}>
                 <Oultlook  props={filteredData} /> 
            </Paper>
          </Grid>
      </Grid>
        
      <Typography variant="h3" gutterBottom align='right'>
         {filteredData.data[0]['Project']}        {filteredData.Quarter? "- " + filteredData.Quarter: '___________'}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
         <ProjectInformation props={filteredData}/> 
        </Grid>
        
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Typography style={{ color: textcolor }} variant="h5">FINANCE</Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
             <GroupedPieCharts portfolioTotal={portfolio} props={filteredData} totalbudget={filteredData.data[0]["Project Budget"]} quarter={filteredData.Quarter} inkindEstimation={inkindEstimation}/> 
          </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Typography style={{ color: textcolor }} variant="h5">CONTEXTUAL RISKS</Typography>
            <RiskChartFusion props={filteredData.data[0].Risks} filteredQuarter={filteredData.Quarter}/> 
        </Grid>
      </Grid>
   
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ color: textcolor }} variant="h5">TIMELINE</Typography>
            <Timelines props={filteredData.data[0]} quarter={filteredData.Quarter}/> 
        </Grid>
      </Grid> </>: <CircularProgress size={40}
        left={-20}
        top={10}
        status={'loading'}
        style={{marginLeft: '50%'}}/>}
    </div>
  );
}