import axios from 'axios';

// add new baby to the DB

export const addNewBaby = babyData => {
 
    return axios
    .post('/api/addNewBaby', {
        baby_first_name: babyData.baby_first_name,
        baby_last_name: babyData.baby_last_name,
        dob: babyData.dob,
        gender: babyData.gender,
        tagNumber: babyData.tagNumber,
        parentUserId: babyData.parentUserId,
    })
    .catch(err => {
        console.log(err);
    })
}

// get the user ID and store in the Local Storage
export const getUserId = babyData => {
 
    return axios
    .get('/api/getUserId', {
    })
    .then(response => {
        const thisUser = response.data.filter(each => each.email === babyData)
        const userId = thisUser[0]._id;
        localStorage.setItem("userId", userId)
        return userId
    })
    .catch(err => {
        console.log(err);
    })
}


//get all the babies in the DB
export const getBabyList = userData => {
    return axios
    .get('/api/displayBabies', {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

// delete baby from the list
export const deleteBaby = babyId => {

    return axios
    .delete("/api/deleteBaby/" + babyId, {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

// updating a baby

export const updateBaby = editBaby => {

    return axios
    .put("/api/updateBaby/" + editBaby._id, {

        baby_first_name: editBaby.baby_first_name,
        baby_last_name: editBaby.baby_last_name,
        dob: editBaby.dob,
        gender: editBaby.gender,
        tagNumber: editBaby.tagNumber,
    })
    .then(response => {
     
        return response.data
    })
    .catch(err => {
        console.log(err);
    })

}