import axios from 'axios';

export const sendEmail = email => {

    return axios
    .post('/api/resetPassword', {
        date: email.date,
        email: email.email,
        first_name:email.first_name,
        last_name: email.last_name,
        password: email.password,
        _id: email._id,
    })
    .catch(err => {
        console.log(err);
    })
}

export const getToken = token => {
    
    return axios
    .get("/reset/" + token)
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err);
    })
}