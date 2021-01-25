import axios from 'axios';

//change port

export const addBaby = babyData => {
    return axios
    .post('/api/register', {
        baby_first_name: babyData.first_name,
        baby_last_name: babyData.last_name,
        dob: babyData.dob,
        gender: babyData.gender,
        tagNumber: babyData.tagNumber
    })
    .then(res => {
        console.log('Registered!');
    })
}