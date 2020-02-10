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

export const putOffer = (offer) => {
    console.log("putOffer", offer);
    const JSONstrOffer = JSON.stringify(offer);
    console.log(JSONstrOffer);
    return fetch(`${OFFERS.POST_OFFER}?id=${offer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONstrOffer,
    });
};

export const uploadPhoto = (file, offerId) => {
    console.log(file);

    const form = new FormData();
    form.append('files', file,  `${offerId}.png`);

    return fetch(`${OFFERS.POST_OFFER}/uploadPhoto`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        body: form,
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

export const getOfferById = (offerId) => {
    return fetch(`${OFFERS.GET_BY_ID}?id=${offerId}`);
};