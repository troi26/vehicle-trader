import {BIDS, OFFERS} from "./Endpoints";

/**
 * Method which calls the endpoint which returns all the offers
 * @returns {Promise<Response>} - returns promise
 */
export const getAllOffers = () => {
    return fetch(OFFERS.GET_ALL);
};

export const postOffer = (offer) => {
    console.log(offer);

    return fetch(OFFERS.POST_OFFER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
    });
};

/**
 * Method which calls the endpoint which returns all the offers of given user by passed userId as argument
 * @param userId - user whose offers want to get
 * @returns {Promise<Response>} - returns promise
 */
export const getOffersByUserId = (userId) => {
    return fetch(`${OFFERS.GET_BY_USER}?userId=${userId}`);
};