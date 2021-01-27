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

export const getBaby = babyData => {
    return axios
    .get('/api/displayBaby', {
    })
    .then(response => {
        // console.log(response.data);
        // console.log(userData);  
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}