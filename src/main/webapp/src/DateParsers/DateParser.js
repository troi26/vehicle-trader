export const buildDatesFromArray = (array, justDateFlag) => {
    if (justDateFlag) {
        return new Date(array[0], array[1] - 1, array[2], 12, 0, 0);
    } else {
        if (array.length < 6) {
            return new Date(array[0], array[1] - 1, array[2], 12, 0, 0);
        } else {
            return new Date(array[0], array[1] - 1, array[2], array[3], array[4], array[5]);
        }
    }
};