import React, { useEffect, useState } from 'react';

import { fetchRoutines } from '../api';

const Routines = () => {
    const [routineList, setRoutineList] = useState([]);

    useEffect(() => {
        Promise.resolve(fetchRoutines())
        .then((routines) => {
            setRoutineList(routines);
        })
        .catch(error => console.error(error))
    }, []);

    return (
        <div>
            <h2 id="routine-title">Routine Catalogue</h2>
            <div id="routines">
                {routineList.map((routine, index) => {
                    return (
                        <div id="routine" key={index}>
                            <h2>{routine.name} by {routine.creatorName}</h2>
                            <p>{routine.goal}</p>
                            <hr></hr>
                            <h4>Activities for this routine:</h4>
                            {routine.activities.map((activity) => {
                                return (
                                    <div id="routineActivity">
                                        <h3>{activity.name}</h3>
                                        <p>{activity.description}</p>
                                        <p>Duration: {activity.duration} | Count: {activity.count}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Routines;