export const alreadyExist = (collection, itemID) => {
    return !!collection.find((item) => item._id === itemID);
}
