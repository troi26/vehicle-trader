import { BIDS } from "./Endpoints";
// import { EventSourcePolyfill } from 'event-source-polyfill';
/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @param offerId - the ID of the offer
 * @returns {EventSource} - returns the subscription object
 */
export const getBidsByOfferId = (offerId) => {
    console.log("getBidsByOfferId");
    return new EventSource(`${BIDS.GET_BIDS_OF_OFFER}?offerId=${offerId}`);
};
/**
 * Method which subscribes to the endpoint which streams all the bids to given user
 * @param userId - the ID of the user
 * @returns {EventSource} - returns the subscription object
 */
export const getBidsByUserId = (userId) => {
    console.log("getBidsByUserId");
    return new EventSource(`${BIDS.GET_BIDS_OF_OFFER}?userId=${userId}`);
};

/**
 * Method that calls post bid end point to create a new bid
 * @param bid - bid to be submitted
 * @returns {Promise<Response>} - returns a promise for further manipulations
 */
export const postBid = (bid) => {
    console.log(bid);

    return fetch(BIDS.POST_BIDS_OF_OFFER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bid),
    });
};