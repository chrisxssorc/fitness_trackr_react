import React, { useEffect, useState } from 'react';

import { fetchUserRoutines, submitNewRoutine, fetchActivities, 
    addActivityToRoutine, updateActivity, deleteActivityFromRoutine,
    updateRoutine, deleteRoutine } from '../api';

const MyRoutines = ({ username, token }) => {
    const [myRoutinesList, setMyRoutinesList] = useState([]);
    const [newName, setNewName] = useState('');
    const [newGoal, setNewGoal] = useState('');
    const [isPublic, setIsPublic] = useState(null);
    const [activityList, setActivityList] = useState([]);
    const [routineId, setRoutineId] = useState('');
    const [activityId, setActivityId] = useState('');
    const [countValue, setCountValue] = useState('');
    const [durationValue, setDurationValue] = useState('');
    
    useEffect(() => {
        Promise.resolve(fetchUserRoutines(username, token))
        .then((myRoutines) => {
            setMyRoutinesList(myRoutines);
        })
        .catch(error => console.error(error))
    },[])

    useEffect(() => {
        Promise.resolve(fetchActivities())
        .then((activities) => {
            setActivityList(activities);
        })
        .catch(error => console.error(error))
    },[]);

    const handleNewRoutineSubmit = async () => {
        const newRoutine = await submitNewRoutine(token, newName, newGoal, isPublic);

        myRoutinesList.push(newRoutine);
        setMyRoutinesList(myRoutinesList);
    }

    const handleAddActivityToRoutine = async () => {
        const newActivity = await addActivityToRoutine(Number(routineId), Number(activityId), Number(countValue), Number(durationValue));

        activityList.push(newActivity);
        setActivityList(activityList);
    }

    const handleDeleteActivityFromRoutine = async () => {
        const deletedActivity = await deleteActivityFromRoutine(activityId, token);

        activityList.pop(deletedActivity);
        setActivityList(activityList);
    }

    const handleUpdateActivity = async () => {
        const updatedActivity = await updateActivity(activityId, countValue, durationValue, token);

        activityList.push(updatedActivity);
        setActivityList(activityList);
    }

    const handleUpdateRoutine = async () => {
        const updatedRoutine = await updateRoutine(routineId, newName, newGoal, token);

        myRoutinesList.push(updatedRoutine);
        setMyRoutinesList(myRoutinesList);
    }

    const handleDeleteRoutine = async () => {
        const deletedRoutine = await deleteRoutine(routineId, token);

        myRoutinesList.pop(deletedRoutine);
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
                        <div id="full-routine-element">
                            <div id="my-routine" key={index}>
                                <h2>{routine.name} by {routine.creatorName}</h2>
                                <p>{routine.goal}</p>
                                <hr></hr>
                                <form className="activity-update-form" id={routine.id} onSubmit={(event)=>{
                                    event.preventDefault();
                                    setRoutineId(event.target.id);
                                    handleAddActivityToRoutine();
                                }}>
                                    <label for="activityOption">Add an Activity to this Routine:</label>
                                    <select id="activityOption" name="activityOption" onChange={(event)=> {
                                        event.preventDefault();
                                        setActivityId(event.target.value);
                                    }}>
                                        <option value="option">Select an Activity...</option>
                                        {
                                            activityList.map((activity) => {
                                                return (
                                                    <option value={activity.id}>{activity.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label for="count">Count:</label>
                                    <input type="number" id="countOption" name="count" min="1" max="99" onChange={(event)=>{
                                        event.preventDefault();
                                        setCountValue(event.target.value);
                                    }}></input>
                                    <label for="duration">Duration:</label>
                                    <input type="number" id="durationOption" name="duration" min="1" max="99" onChange={(event)=>{
                                        event.preventDefault();
                                        setDurationValue(event.target.value);
                                    }}></input>
                                    <button>Submit</button>
                                </form>
                                <h4>Activities for this routine:</h4>
                                {routine.activities
                                ? routine.activities.map((activity) => {
                                    return (
                                        <div className="myRoutineActivity" id="routineActivity">
                                            <div>
                                                <h3>{activity.name}</h3>
                                                <p>{activity.description}</p>
                                                <p>Duration: {activity.duration} | Count: {activity.count}</p>
                                                <button id={activity.routineActivityId} onClick={(event)=>{
                                                    event.preventDefault();
                                                    setActivityId(event.target.id)
                                                    handleDeleteActivityFromRoutine();
                                                }}>Delete</button>
                                            </div>
                                            <div id="activity-update">
                                                <h3>Edit this activity:</h3>
                                                <form id={activity.routineActivityId} onSubmit={(event)=>{
                                                    event.preventDefault();
                                                    setActivityId(event.target.id);
                                                    handleUpdateActivity();
                                                }}>
                                                    <label for="count">New Count:</label>
                                                    <input type="number" id="newCountOption" name="count" min="1" max="99" onChange={(event)=>{
                                                        event.preventDefault();
                                                        setCountValue(event.target.value);
                                                    }}></input>
                                                    <label for="duration">New Duration:</label>
                                                    <input type="number" id="newDurationOption" name="duration" min="1" max="99" onChange={(event)=>{
                                                        event.preventDefault();
                                                        setDurationValue(event.target.value);
                                                    }}></input>
                                                    <button>Submit Edits</button>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                })
                                : ''
                                }
                            </div>
                            <div id="routine-update-form">
                                <form className="update-routine update-routine-element" id={routine.id} onSubmit={(event)=>{
                                    event.preventDefault();
                                    setRoutineId(event.target.id);
                                    handleUpdateRoutine();
                                }}>
                                <label className="update-routine-element">Submit a new name or goal for this routine:</label>
                                <input
                                    className="update-routine-element"
                                    id="newActivityName"
                                    type="text"
                                    placeholder="Enter routine name..."
                                    onChange={(event)=>{
                                        event.preventDefault();
                                        setNewName(event.target.value);
                                    }
                                }/>
                                <textarea
                                    className="update-routine-element"
                                    id="newActivityDescription"
                                    placeholder="Enter routine goal..."
                                    rows="2"
                                    cols="20"
                                    onChange={(event)=>{
                                        event.preventDefault();
                                        setNewGoal(event.target.value);
                                    }
                                }/>
                                <button className="update-routine-element">Submit Edits</button>
                                </form>
                            </div>
                            <div id="delete-routine">
                                <label>Delete this routine:</label>
                                <button id={routine.id} onClick={(event)=>{
                                    event.preventDefault();
                                    setRoutineId(event.target.id);
                                    handleDeleteRoutine();
                                }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default MyRoutines;