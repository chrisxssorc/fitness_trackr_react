import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

// import {
//     BrowserRouter as Router,
//     Route,
//     Switch,
//     Redirect
// } from 'react-router-dom';

import {
    //Home,
    //Routines,
    //MyRoutines,
    Activities
} from './components'

const App = () => {
    return (
        <div className="App">
            Fitness Trackr App
            <Activities />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);