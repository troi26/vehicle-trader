import {SECURITY, USERS} from "./Endpoints";

export const login = (form) => {
    console.log("LOGIN: ", form);
    // return new Promise((resolve, reject) => {
    const data = new FormData(form);
    return fetch(SECURITY.LOGIN, {
        method: 'POST',
        body: data,
    });
    // .then((response) => {
    //     console.log(response);
    //     resolve(response)
    // })
    // .catch((reason) => reject(reason))
    // });
};

export const getAuthenticatedUser = () => {
    return fetch(SECURITY.GET_AUTH);
    // return fetch(USERS.GET_ALL);
};