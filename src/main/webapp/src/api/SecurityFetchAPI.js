import {SECURITY, USERS} from "./Endpoints";

export const login = (form) => {
    console.log("LOGIN: ", form);

    const data = new FormData(form);
    return fetch(SECURITY.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        },
        mode: 'cors',
        body: new URLSearchParams(data),
    });
};

export const logout = (form) => {
    console.log("LOGOUT: ", form);
    // const data = new FormData(form);
    return fetch(SECURITY.LOGOUT)/*, {
        // method: 'POST',
        // headers: {
        //     Accept: 'application/json',
        // },
        // body: data,
    });*/
};

export const getLoggedUser = () => {
    // console.log("LOGOUT: ", form);
    // const data = new FormData(form);
    return fetch(SECURITY.GET_AUTH, {
        headers: {
            redirect: 'follow',
        }
    });
};