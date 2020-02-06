import { BIDS } from "./Endpoints";

/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @param offerId - the ID of the offer
 * @returns {EventSource} - returns the subscription object
 */
export const getBidsByOfferId = (offerId) => {
    return new EventSource(`${BIDS.GET_BIDS_OF_OFFER}?offerId=${offerId}`);
};