import React, { useEffect, useState } from 'react';

import { fetchUserRoutines, submitNewRoutine, fetchActivities } from '../api';

const MyRoutines = ({ username, token }) => {
    const [myRoutinesList, setMyRoutinesList] = useState([]);
    const [newName, setNewName] = useState('');
    const [newGoal, setNewGoal] = useState('');
    const [isPublic, setIsPublic] = useState(null);
    const [activityList, setActivityList] = useState([]);
    
    useEffect(() => {
        Promise.resolve(fetchUserRoutines(username, token))
        .then((myRoutines) => {
            setMyRoutinesList(myRoutines);
        })
        .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        Promise.resolve(fetchActivities())
        .then((activities) => {
            setActivityList(activities);
        })
        .catch(error => console.error(error))
    }, []);

    const handleNewRoutineSubmit = async () => {
        const newRoutine = await submitNewRoutine(token, newName, newGoal, isPublic);

        myRoutinesList.push(newRoutine);
        setMyRoutinesList(myRoutinesList);
    }
    
    return (
        <div>
            <h2 id="activity-title">Routine Catalogue</h2>
            <div id="my-routines">
                <div id="newActivityForm">
                    <form onSubmit={(event) => {
                                event.preventDefault();
                                handleNewRoutineSubmit();
                            }
                        }>
                        <label>Submit a New Routine</label>
                        <input
                            id="newActivtyName"
                            type="text"
                            placeholder="Enter routine name..."
                            onChange={(event)=>{
                                event.preventDefault();
                                setNewName(event.target.value);
                            }
                        }/>
                        <textarea
                            id="newActivityDescription"
                            placeholder="Enter routine goal..."
                            rows="2"
                            cols="20"
                            onChange={(event)=>{
                                event.preventDefault();
                                setNewGoal(event.target.value);
                            }
                        }/>
                        <input 
                            type="checkbox" 
                            id="isPublic" 
                            name="isPublic"
                            onChange={(event)=>{
                                event.preventDefault();
                                setIsPublic(event.target.value);
                            }
                        }/>
                        <label id="isPublicLabel" for="isPublic">Public Routine</label>
                        <button>Submit</button>
                    </form>
                </div>
                <div id="my-routine-list">
                {myRoutinesList.map((routine, index) => {
                    return (
                        <div id="my-routine" key={index}>
                            <h2>{routine.name} by {routine.creatorName}</h2>
                            <p>{routine.goal}</p>
                            <hr></hr>
                            <form id="activity-update-form">
                                <label for="activityOption">Add an Activity to this Routine:</label>
                                <select id="activityOption" name="activityOption">
                                    <option value="option">Select an Activity...</option>
                                    {
                                        activityList.map((activity) => {
                                            return (
                                                <option value={activity.name}>{activity.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label for="count">Count:</label>
                                <input type="number" id="countOption" name="count" min="1" max="99"></input>
                                <label for="duration">Duration:</label>
                                <input type="number" id="durationOption" name="duration" min="1" max="99"></input>
                                <button>Submit</button>
                            </form>
                            <h4>Activities for this routine:</h4>
                            {routine.activites
                            ? routine.activities.map((activity) => {
                                return (
                                    <div id="my-routineActivity">
                                        <div id="activity">
                                            <h3>{activity.name}</h3>
                                            <p>{activity.description}</p>
                                            <p>Duration: {activity.duration} | Count: {activity.count}</p>
                                            <button>Delete</button>
                                        </div>
                                        <div id="activity-update">
                                            
                                        </div>
                                    </div>
                                )
                            })
                            : ''
                            }
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default MyRoutines;