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

export const getUserId = babyData => {
    let userId = "";
    return axios
    .get('/api/getUserId', {
    })
    .then(response => {
        response.data.map((each) => {
            if (each.email === babyData) {
                return userId = each._id
            }
        })
        localStorage.setItem("userId", userId)
        return userId
    })
    .catch(err => {
        console.log(err);
    })
}

//get all the logs in the DB

export const getLogs = logData => {
    return axios
    .get('/api/getLogs', {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

//delete a log

export const deleteLog = logId => {

    return axios
    .delete("/api/deleteLogs/" + logId, {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

// updating a log 

export const updateLog = editLog => {

    return axios
    .put("/api/updateLog/" + editLog._id, {
        date: editLog.date,
        time: editLog.time,
        notes:editLog.notes,
        logCategory:editLog.logCategory
    })
    .then(response => {
     
        return response.data
    })
    .catch(err => {
        console.log(err);
    })

}