import { OFFERS } from "./Endpoints";

/**
 * Method which calls the endpoint which returns all the offers
 * @returns {Promise<Response>} - returns promise
 */
export const getAllOffers = () => {
    return fetch(OFFERS.GET_ALL);
};

/**
 * Method which calls the endpoint which returns all the offers of given user by passed userId as argument
 * @param userId - user whose offers want to get
 * @returns {Promise<Response>} - returns promise
 */
export const getOffersByUserId = (userId = "5e3aeb10831f801e447e5eb1") => {
    return fetch(`${OFFERS.GET_BY_USER}?userId=${userId}`);
};