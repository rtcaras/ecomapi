const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");
const stripeRoute = require("./Routes/stripeRoute");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() =>console.log("DB Connect successfull!"))
    .catch(err => {
        console.log(err);
    });

    //All API Route Comes Here
    app.use(cors());
    app.use("/api/auth", authRoute);
    app.use("api/users", userRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log(" Server is running on PORT! ${PORT}");
   
});