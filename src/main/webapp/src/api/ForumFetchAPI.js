import { FORUM } from "./Endpoints";

/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @returns {[Forum]} - returns Array of forums
 */
export const getAllForumPages = () => {
    return fetch(FORUM.GET_FORUMS);
};

/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @param topic - topic to search by
 * @returns {Promise<Response>} - returns Array of forums
 */
export const getPostsForTopic = (topic) => {
    return fetch(FORUM.GET_FORUMS + topic);
};

/**
 * Method that calls post forum end point to create a new post on a topic
 * @returns {Promise<Response>} - returns a promise for further manipulations
 * @param topic
 * @param postMessage
 */
export const postPostForTopic = (topic, postMessage) => {
    console.log(postMessage);
    return fetch(`${FORUM.POST_POST_ON_FORUM_BY_TOPIC}${topic}`, {
        method: 'POST',
        headers: {
            // 'Accept': '*/*',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(postMessage),
    });
};

export const updatePostInTopic = (topic, postId, postData) => {
    return fetch(`${FORUM.POST_POST_ON_FORUM_BY_TOPIC}${topic}/${postId}`, {
        method: 'PUT',
        headers: {
            // 'Accept': '*/*',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(postData),
    });
};

let makeid = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 };
 

let convertToString = function(date) {
    return date.getFullYear() + "-" 
    + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" 
    + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " "
    + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":"
    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":"
    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
};