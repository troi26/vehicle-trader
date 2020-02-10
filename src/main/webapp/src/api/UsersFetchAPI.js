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

/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const getAllInactiveAccounts = () => {
    return fetch(`${USERS.INACTIVE_ACCOUNTS}`);
};


/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const getAllActiveAccounts = () => {
    return fetch(`${USERS.GET_ALL_ACTIVE_ACCOUNTS}`);
};

/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const getAllActiveAccountsNotMe = (ignoreId) => {
    return fetch(`${USERS.GET_ALL_ACTIVE_ACCOUNTS}?id=${ignoreId}`);
};

/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const activateAcc = (userId) => {
    console.log("activateAcc", userId);
    return fetch(`${USERS.ACTIVATE_ACCOUNT}?id=${userId}`, {
        method: 'PUT',
    });
};
/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const deactivateAcc = (userId) => {
    console.log("activateAcc", userId);
    return fetch(`${USERS.DEACTIVATE_ACCOUNT}?id=${userId}`, {
        method: 'PUT',
    });
};
/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const getAllIgnoringId = (userId) => {
    console.log("getAllIgnoringId", userId);
    return fetch(`${USERS.GET_ALL_OTHER_ACCOUNTS}?id=${userId}`);
};

/**
 * Method which calls the endpoint which returns all the inactive accounts
 * @returns {Promise<Response>} -
 */
export const registerAccount = (userData) => {

    return fetch(`${USERS.REGISTER_ACCOUNT}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(userData),
    });
};
