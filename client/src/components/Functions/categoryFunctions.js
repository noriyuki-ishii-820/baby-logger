import axios from 'axios';

// add new category to the DB

export const addNewCategory = categoryData => {
 
    return axios
    .post('/api/addCategory', {
        category:categoryData.category,
        parentUserId: categoryData.parentUserId,
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

//get all categories

export const getCategory = categoryData => {
    return axios
    .get('/api/getCategory', {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}

//delete a log

export const deleteCategory = categoryId => {

    return axios
    .delete("/api/deleteCategory/" + categoryId, {
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err);
    })
}