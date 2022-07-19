import axios, { AxiosResponse } from "axios";

/*
this file is about configuration for using axios easier.
centralize all of our access configuration and our queries 
to make it easier to use inside components.
*/

axios.defaults.baseURL = 'http://localhost:5000/api/';


//getting the response to data and storing it inside this reponse body
const responseBody = (response:AxiosResponse) => response.data;

//with server
const requsets = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),

}

//storing catalog
const Catalog = {
    list: () => requsets.get('products'),
    details: (id: number) => requsets.get(`products/${id}`)
}


//test error
const TestErrors = {
    get400Error: () => requsets.get('buggy/bad-request'),
    get401Error: () => requsets.get('buggy/unauthorized'),
    get404Error: () => requsets.get('buggy/not-found'),
    get500Error: () => requsets.get('buggy/server-error'),
    getValidationError: () => requsets.get('buggy/validation-error'),
}


const agent = {
    Catalog,
    TestErrors
}


export default agent;