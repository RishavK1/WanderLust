const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        type: String,
        default : "https://unsplash.com/photos/a-large-rock-formation-in-the-middle-of-the-ocean-ximFU43CNEg",
        set : (v) => v===" " ? "https://unsplash.com/photos/a-large-rock-formation-in-the-middle-of-the-ocean-ximFU43CNEg" : v,
    },
    price : String,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing",ListingSchema );
module.exports = Listing;