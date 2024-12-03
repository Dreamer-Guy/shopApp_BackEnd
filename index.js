import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "./src/config/mongoose.js";
import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import cartRoute from "./src/routes/cartRoute.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import upload from './src/config/multer.js';

import adminProductDetailsRouter from "./src/routes/admin/productDetails.js";
import adminProductRouter from './src/routes/admin/product.js';

import orderRouter from "./src/routes/orderRoute.js"

const corsOptions = {
    origin: `${process.env.FRONTEND_BASE_URL}`,
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    return res.send("Hello World");
});
// feature/productDetails
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admin/productDetails", adminProductDetailsRouter);
app.use("/admin/products", adminProductRouter);
app.use("/order",orderRouter)
app.use("/cart",cartRoute)
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});