import axios from 'axios';

//change port

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

