import {RATING} from "./Endpoints";


export const getUserRatingById = (userId) => {
    return fetch(`${RATING.GET_USER_OVERALL_RATING}${userId}`);
};

export const getUserRatingByGraderId = (userId, graderId) => {
    return fetch(`${RATING.GET_RATING_BY_GRADER_AND_EV}${userId}/${graderId}`);
};

export const postUserRating = (rating) => {
    return fetch(`${RATING.POST_RATING}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rating),
    });
};