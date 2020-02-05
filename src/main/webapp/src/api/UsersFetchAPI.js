import { USERS } from "./Endpoints";

export const getAllUsers = () => {
    console.log("getAllUsers");
    // return new Promise((resolve, reject) => {
    return fetch(USERS.GET_ALL);
    // .then((response) => {
    //     console.log(response);
    //     resolve(response)
    // })
    // .catch((reason) => reject(reason))
    // });
};


export const getUserById = () => {
    return fetch(USERS.GET_ALL);
};
