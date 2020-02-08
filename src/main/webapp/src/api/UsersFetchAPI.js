import {USERS} from "./Endpoints";

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
