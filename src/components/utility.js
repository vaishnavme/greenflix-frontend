export const checkIn = (collection, itemID) => {
    return !!collection.find((item) => item._id === itemID);
}
