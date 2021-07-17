export const alreadyExist = (collection, itemID) => {
    console.log("hi")
    return !!collection.find((item) => item._id === itemID);
}
