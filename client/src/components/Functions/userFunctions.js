import axios from 'axios';


//register a new user
export const registerUser = userData => {
    return axios
    .post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
    })
    .then(res => {
        console.log('Registered!');
    })
}

// log in an user
export const loginUser = userData => {

    return axios
    .post('/api/login', {
        email: userData.email,
        password: userData.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

//get all user data
export const getUsers = userData => {
    return axios
    .get('/api/displayusers', {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

// update a user info

export const updateUser = updateUser => {

    return axios
    .put("/api/updateUser", {
        email: updateUser.email,
        password: updateUser.password
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })

}