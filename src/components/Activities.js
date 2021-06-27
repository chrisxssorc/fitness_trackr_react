import React, { useEffect, useState } from 'react';

import { fetchActivities, submitNewActivity } from '../api';

const Activities = ({token}) => {
    const [activityList, setActivityList] = useState([]);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        Promise.resolve(fetchActivities())
        .then((activities) => {
            setActivityList(activities);
        })
        .catch(error => console.error(error))
    }, []);

    const submitNewActivityHandler = async () => {
        try {
            const newActivity = await submitNewActivity(token, newName, newDescription);
            
            activityList.push(newActivity);
            setActivityList(activityList);
        } catch (error) {
            throw error;
        }
    }

    return (
    <div>
        <h2 id="activity-title">Activity Catalogue</h2>
        <div id="activities">
            {
                token
                ? <div id="newActivityForm">
                    <form onSubmit={(event) => {
                                event.preventDefault();
                                submitNewActivityHandler();
                            }
                        }>
                        <label>Submit a New Activity</label>
                        <input
                            id="newActivtyName"
                            type="text"
                            placeholder="Enter activity name..."
                            onChange={(event)=>{
                                    event.preventDefault();
                                    setNewName(event.target.value);
                                }
                            }/>
                        <textarea
                            id="newActivityDescription"
                            placeholder="Enter activity description..."
                            rows="2"
                            cols="20"
                            onChange={(event)=>{
                                event.preventDefault();
                                setNewDescription(event.target.value);
                            }
                        }/>
                        <button>Submit</button>
                    </form>
                </div>
                : ''
            }
            <div id="activityList">
                {activityList.map((activity, index) => {
                    return (
                        <div id="activity" key={index}>
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default Activities;