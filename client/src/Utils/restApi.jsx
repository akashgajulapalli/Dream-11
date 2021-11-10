import axios from 'axios';
export const getService = async (getOptions) => {
    let LoginToken = localStorage.getItem('token');
    let AuthHeaders = '';
    if (LoginToken) {
        AuthHeaders = { 'token': LoginToken, 'Content-Type': 'application/json' };
    } else {
        AuthHeaders = { 'Content-Type': 'application/json' };
    }
    getOptions.headers = Object.assign({}, AuthHeaders, getOptions.headers || {});
    try {
        let response = await axios(getOptions);
        return response;
    } catch (e) {
        if (e.response && e.response.status === 401 && LoginToken) {
            window.location.href = '/logout';
        } else {
            return e.response;
        }
    }
}

// //using getService method for HTTP GET
// const getBooks = {
//     method: 'GET',
//     url: ''//backend rest api url
// };
// // Catching backend response from getService method.
// const getResponse = await getService(getBooks);
// if (getResponse && getResponse.status == 200) {
//     //success case
// } else {
//     // failure case
// }

// //using getService method for HTTP POST
// const postBook = {
//     method: 'POST',
//     url: '',//backend rest api url
//     data: {}
// };
// const postResponse = awaipostService(postBook);
// if (postResponse && postResponse.status == 200) {
//     //success case
// } else {
//     // failure case
// }


// //using getService method for HTTP PUT
// const putBook = {
//     method: 'PUT',
//     url: '',//backend rest api url
//     data: {}
// };
// const putResponse = await getService(putBook);
// if (putResponse && putResponse.status == 200) {
//     //success case
// } else {
//     // failure case
// }


// //using getService method for HTTP DELETE
// const deleteBook = {
//     method: 'DELETE',
//     url: ''//backend rest api url
// };
// const deleteResponse = await getService(deleteBook);
// if (deleteResponse && deleteResponse.status == 200) {
//     //success case
// } else {
//     // failure case
// }

