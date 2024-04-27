// Import required packages and modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Define the MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/AirBnb2";

// Connect to the MongoDB database using the defined URL
main().then((res)=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
});

// Define the main function to handle the connection promise
async function main() {
    await mongoose.connect(MONGO_URL);
}

// Set the view engine to EJS and configure the views directory
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// Enable URL-encoded request body parsing and method overriding
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Configure EJS to use ejsMate
app.engine('ejs',ejsMate);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname,"/public")));

// Define the root route to send a simple message
app.get("/",(req, res)=>{
    res.send("All working properly");
});

// Define the index route to fetch and render all listings
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
     res.render("./listings/index.ejs",{allListings});
});

// Define the new route to render the new listing form
app.get("/listings/new",(req, res)=>{
    res.render("./listings/new.ejs");
});

// Define the show route to fetch and render a specific listing
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

// Define the create route to handle new listing submissions
app.post("/listings", async(req, res)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Define the edit route to fetch and render a specific listing for editing
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
});

// Define the update route to handle listing updates
app.put("/listings/:id",async(req, res)=>{
let {id} = req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
});

// Define the delete route to handle listing deletions
app.delete("/listings/:id",async(req,res)=>{
let {id} = req.params;
 let deletedListing= await Listing.findByIdAndDelete(id);
 res.redirect("/listings");
});

// Start the server and listen on port 2000
app.listen(2000,()=>{
    console.log(`App is listening to server 2000`);
});