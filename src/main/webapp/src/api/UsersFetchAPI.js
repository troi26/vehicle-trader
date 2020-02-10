import {OFFERS, USERS} from "./Endpoints";

/**
 * Method which calls the endpoint which returns all the users
 * @returns {Promise<Response>}
 */
export const getAllUsers = () => {
    console.log("getAllUsers");
    return fetch(USERS.GET_ALL/*, {
        mode: 'cors',
        headers: {
            credentials: true,
            // Authorization: `${token.tokenType} ${token.accessToken}`,
        },
    }*/);
};


export const uploadPhoto = (file, userId) => {
    console.log(file);

    const form = new FormData();
    form.append('files', file,  `${userId}.png`);

    return fetch(`${USERS.PUT_USER}/uploadUserPhoto`, {
        method: 'POST',
        body: form,
    });
};


export const updateUser = (user) => {
    console.log("updateUser", user);
    const JSONstrUsr = JSON.stringify(user);
    console.log(JSONstrUsr);
    return fetch(`${USERS.PUT_USER}?id=${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONstrUsr,
    });
};

/**
 * Method which calls the endpoint which returns the user with the given ID
 * @returns {Promise<Response>} -
 */
export const getUserById = (userId) => {
    return fetch(`${USERS.GET_BY_ID}?id=${userId}`, {
        // headers: {
        //     Authorization: `${token.tokenType} ${token.accessToken}`,
        // },
    });
};
