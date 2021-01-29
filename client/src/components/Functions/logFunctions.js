import axios from 'axios';

// add new baby to the DB

export const addLog = logData => {
    return axios
    .post('/api/addLog', {
        date: logData.date,
        time: logData.time,
        logCategory: logData.logCategory,
        notes: logData.notes,
        babyId: logData.babyId,
        parentUserId: logData.parentUserId
    })
    .then(res => {
        console.log('Added');
    })
}