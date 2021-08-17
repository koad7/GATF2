

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimelineChart from '../../Timeline/Items/TimelineChart'
import TimelineInDepth from './Items/TimelineInDepth'
// import useRequestData from '../../../hooks/useDataFilter';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  
  heading: {
    
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
    height:500,
    overflow:'scroll',
    display:'block',
    zIndex: 5,
    backgroundColor: theme.palette.background.paper,
  },
  details: {
      display: 'flex'
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


//filteredQuarter={filteredData.Quarter}
export default function Timelines({props,quarter}) {
  const classes = useStyles();


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
        <AppBar position="sticky" color="secondary"> 
            <Tabs value={value} style={{ background: '#0064a8' }} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Timeline Chart" {...a11yProps(0)} />
                <Tab label="Timeline Table" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <TimelineChart seriesData={props} quarter={quarter}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TimelineInDepth  seriesData={props} quarter={quarter}/>
        </TabPanel>
        
    </div>
  );
}