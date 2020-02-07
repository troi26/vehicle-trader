import { BIDS } from "./Endpoints";

/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @param offerId - the ID of the offer
 * @returns {EventSource} - returns the subscription object
 */
export const getBidsByOfferId = (offerId) => {
    return new EventSource(`${BIDS.GET_BIDS_OF_OFFER}?offerId=${offerId}`);
};

/**
 * Method that calls post bid end point to create a new bid
 * @param bid - bid to be submitted
 * @returns {Promise<Response>} - returns a promise for further manipulations
 */
export const postBid = (bid) => {
    console.log(bid);

    return fetch(BIDS.POST_BIDS_OF_OFFER, {
        mode: 'cors',
        method: 'POST',
        headers: {
            // 'Accept': '*/*',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(bid),
    });
};