import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

/*
this file is about configuration for using axios easier.
centralize all of our access configuration and our queries 
to make it easier to use inside components.
*/

//Promise : 비동기처리 , for progress bar
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));  

axios.defaults.baseURL = 'http://localhost:5000/api/';


//getting the response to data and storing it inside this reponse body
const responseBody = (response:AxiosResponse) => response.data;


//interceptor. get error message from axios if error occurs
axios.interceptors.response.use(async response => {
    //비동기처리
    await sleep();
    return response

},(error: AxiosError)=>{
    const { data, status } = error.response as any;

    switch(status){
        case 400:
            //Vaildation error 
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for(const key in data.errors) {
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname:'/server-error',
                state: {error: data}
            });
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})


//object for request (response for request)
const requsets = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),

}

//request to controller (server) 
const Catalog = {
    list: () => requsets.get('products'),
    details: (id: number) => requsets.get(`products/${id}`)
}


//buggycontroller test error
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