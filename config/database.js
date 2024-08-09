const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL)
            .then(() => {
                console.log("Successfully connected to the database");
            })
            .catch((error) => {
                console.error("Error connecting to the database", error);
                process.exit(1);
            });
    } catch (error) {
        console.error("Unexpected error while connecting to the database", error);
    }
};
