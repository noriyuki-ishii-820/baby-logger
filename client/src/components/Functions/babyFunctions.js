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
}

// get the user ID and store in the Local Storage
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