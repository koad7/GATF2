import React,{useState,useEffect} from 'react';

import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
// import Register from '../Register';
import Login from '../Login';
import LinearBuffer from '../LinearBuffer';
import firebase from '../firebase'
import {MuiThemeProvider} from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles'
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

/*default material-ui theme generation*/
const theme=createTheme()

function App(props){

    //Let's use the useState object to keep the firebase state
    const [firebaseInitialized,setFirebaseInitialized]=useState(false)

    //Let's use useEffect to run the isInitialized function before the page loads.
    useEffect(()=>{

        firebase.isInitialized().then(val=>{
            setFirebaseInitialized(val)
        })
    })

    //Process of displaying components according to firebase connection result
    return firebaseInitialized!==false?(
       <MuiThemeProvider theme={theme}>
           <CssBaseline/>
           <Router>
               <Switch>
                   {/* Routing according to the path entered */}
                   <Route exact path='/' component={HomePage} />
                   {/* <Route exact path='/register' component={Register} /> */}
                   <Route exact path='/login' component={Login} />
                   <Route exact path='/dashboard' component={Dashboard} />
               </Switch>
           </Router>
       </MuiThemeProvider>
    ):<div id="loader"><LinearBuffer/></div>
}

export default App /*we export to access other files.*/