import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div id="App">
                Fitness Trackr App
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);