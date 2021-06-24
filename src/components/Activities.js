import React, { useEffect, useState } from 'react';

import { fetchActivities } from '../api';

const Activities = () => {
    const [activityList, setActivityList] = useState([]);

    useEffect(() => {
        Promise.resolve(fetchActivities())
        .then((activities) => {
            setActivityList(activities);
        })
        .catch(error => console.error(error))
    }, []);

    return (<div id="activities">
        {activityList.map((activity, index) => {
            return (
                <div id="activity" key={index}>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                </div>
            )
        })}
    </div>)
}

export default Activities;