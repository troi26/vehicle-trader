import { CHATS } from "./Endpoints";

/**
 * Method which subscribes to the endpoint which streams all the bids to given offer
 * @param channelId - the ID of the channel
 * @returns {EventSource} - returns the subscription object
 */
export const getChatsOnChannel = (channelId) => {
    return new EventSource(`${CHATS.GET_CHATS_BY_CHANNEL}${channelId}`);
};

/**
 * Method that calls post bid end point to create a new bid
 * @param chatMessage - bid to be submitted
 * @returns {Promise<Response>} - returns a promise for further manipulations
 */
export const postChatMessage = (chatMessage) => {
    console.log(chatMessage);
    const dateStr = convertToString(chatMessage.messageDateTime);
    chatMessage.messageDateTime = dateStr;
    return fetch(CHATS.POST_CHAT_ON_CHANNEL, {
        mode: 'cors',
        method: 'POST',
        headers: {
            // 'Accept': '*/*',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(chatMessage),
    });
};

let convertToString = function(date) {
    return date.getFullYear() + "-" 
    + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-" 
    + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " "
    + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":"
    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":"
    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
}