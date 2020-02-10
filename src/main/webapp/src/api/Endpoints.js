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
};

// Users endpoints
export const USERS = {
    GET_ALL: "http://localhost:8080/api/users",
    GET_BY_ID: "http://localhost:8080/api/users",
    PUT_USER: "http://localhost:8080/api/users",
};

// Security endpoints
export const SECURITY = {
    // LOGIN: "http://localhost:8080/api/auth/signin",
    LOGIN: "http://localhost:8080/perform_login",
    LOGOUT: "http://localhost:8080/perform_logout",
    GET_AUTH: "http://localhost:8080/user",
};