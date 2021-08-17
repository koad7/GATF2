import React from 'react'
import { Typography} from '@material-ui/core'
// import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
// NEW IMPORT
import Header from '../Header';
// import Map from './components/Map';
import OverviewTable from './components/Overview/OverviewTable';
import FinancePage from './components/Finance/FinancePage';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TimelinePage from './components/Timeline/TimelinePage.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetchApi from '../../hooks/useFetchApi';
import Toolbar from "@material-ui/core/Toolbar";


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3* 2))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing(3),
	},
	appbar: {
		backgroundColor:"#3288ED"
	},
    logo: {
      maxWidth: 40,
      marginRight: '10px'
    }
})

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
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
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
  
  const API_URL="http://127.0.0.1:8000/api/"
  export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
  };
  

function Dashboard(props) {
    const { classes } = props
    const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	  };
//     const [fruit, setFruit] = useState('')

//     useEffect(() => {
//     //getting firestore data
//     firebase.getCurrentUserFruit().then(setFruit)
//   },[])
  
    
const {projectData,
    requestStatus,
    error} = useFetchApi()

  if(!firebase.getCurrentUsername()) {
	// not logged in
	alert('Please login first')
	props.history.replace('/login')
	return null
}
  

	return (
		<div className={classes.root}>
		<Header/>
		

			<AppBar position="static" style={{ background: '#3f4643' }} className={classes.appbar}>
				<Toolbar>
					<Tabs value={value} indicatorColor="secondary" onChange={handleChange} aria-label="simple tabs example">
					{/* <Tab label="Map" {...a11yProps(0)} /> */}
					<Tab label="Overview" {...a11yProps(0)} />
					<Tab label="Finance" {...a11yProps(1)} /> 
					<Tab label="Timelines" {...a11yProps(2)} />
					</Tabs>
					{/* <Button type="submit" fullWidth variant="contained" color="secondary" onClick={logout} className={classes.submit}>
						Logout
					</Button> */}
				</Toolbar>
			</AppBar>      
{/* 			
			<TabPanel value={value} index={0}>
			  {/* <Map/> }
			</TabPanel> 
			*/}

			<TabPanel value={value} index={0}>
			  {/* Projet Overviews  */}
			  {projectData ? <OverviewTable seriesData={projectData.data}/> : <CircularProgress />}
			</TabPanel>
			<TabPanel value={value} index={1}>
			  {/* Projet Finances  */}
			  {projectData ? <FinancePage seriesData={projectData.data}/> : <CircularProgress />}
			</TabPanel>
			<TabPanel value={value} index={2}>			  
			  {projectData  ? <TimelinePage seriesData={projectData.data}/> :  <CircularProgress /> }
			</TabPanel>
			</div>
	
	)

	// async function logout() {
	// 	await firebase.logout()
	// 	//use for routing
	// 	props.history.push('/')
	// 	//
	// 	//
	// }
}

export default withRouter(withStyles(styles)(Dashboard))