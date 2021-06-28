import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import {
    Home,
    Routines,
    MyRoutines,
    Activities
} from './components'

const App = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem("username")));

    return (
        <Router>
            <div className="App">
                <Home 
                    token = {token}
                    setToken = {setToken}
                    username = {username}
                    setUsername = {setUsername} />
                    
                <Switch>
                    <Route exact path="/home">
                        <p id="intro">
                            Welcome to the Fitness Trackr App. Navigate 
                            around to see activities and routines created 
                            by other users. Log in or register a new account 
                            to create and submit your own.
                        </p>
                    </Route>
                    {token
                        ? <Route path="/myroutines">
                            <MyRoutines
                                username = {username}
                                token = {token} />
                        </Route>
                        : ''
                    }
                    <Route path="/routines">
                        <Routines />
                    </Route>
                    <Route path="/activities">
                        <Activities 
                            token = {token} />
                    </Route>
                </Switch>
            </div>
        </Router>
        
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);