const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
const { deleteMany, insertMany } = require("../models/listing");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
    console.log("connected to DB ");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB =async () => {
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj,
        owner:"68683565273b9eab5b5b0eaf", }));
    await listing.insertMany(initdata.data);
    console.log("data was initialize");
}

initDB();


