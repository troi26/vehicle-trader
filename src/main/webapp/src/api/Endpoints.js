// Bids endpoints
export const BIDS = {
    GET_BIDS_OF_OFFER: "http://localhost:8080/api/bids/stream",
    POST_BIDS_OF_OFFER: "http://localhost:8080/api/bids/save",
};

// Offers endpoints
export const OFFERS = {
    GET_ALL: "http://localhost:8080/api/offers",
    GET_BY_ID: "http://localhost:8080/api/offers",
    GET_BY_USER: "http://localhost:8080/api/offers",
    POST_OFFER: "http://localhost:8080/api/offers",

    FINALIZE_OFFER: "http://localhost:8080/api/offers/finalize",
    CLOSE_OFFER: "http://localhost:8080/api/offers/finalize",
};

// Users endpoints
export const USERS = {
    GET_ALL: "http://localhost:8080/api/users",
    GET_BY_ID: "http://localhost:8080/api/users",
    PUT_USER: "http://localhost:8080/api/users",
    INACTIVE_ACCOUNTS: "http://localhost:8080/api/users/accounts/inactive",
    ACTIVATE_ACCOUNT: "http://localhost:8080/api/users/accounts/activate",
    DEACTIVATE_ACCOUNT: "http://localhost:8080/api/users/accounts/deactivate",
    GET_ALL_OTHER_ACCOUNTS: "http://localhost:8080/api/users/accounts/excluded",
    REGISTER_ACCOUNT: "http://localhost:8080/api/users/register",

    GET_ALL_ACTIVE_ACCOUNTS: "http://localhost:8080/api/users/accounts/active",
    GET_NOT_ME_ACTIVE_ACCOUNTS: "http://localhost:8080/api/users/accounts/active/others",
};

// Security endpoints
export const SECURITY = {
    // LOGIN: "http://localhost:8080/api/auth/signin",
    LOGIN: "http://localhost:8080/perform_login",
    LOGOUT: "http://localhost:8080/perform_logout",
    GET_AUTH: "http://localhost:8080/user",
};