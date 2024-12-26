import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "./src/config/mongoose.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import cartRouter from "./src/routes/shop/cartRoute.js";
import userRouter from "./src/routes/shop/userRoute.js";
import productDetailsRouter from './src/routes/shop/productDetailsRoute.js';
import productRouter from "./src/routes/shop/productRoute.js";
import reviewRouter from './src/routes/shop/reviewRoute.js';

import adminProductDetailsRouter from "./src/routes/admin/productDetails.js";
import adminProductRouter from './src/routes/admin/product.js';
import adminBrandRouter from './src/routes/admin/brand.js';
import adminCategoryRouter from './src/routes/admin/category.js';
import adminCategoryTypicalDetails from "./src/routes/admin/categoryTypical.js";
import adminCustomerRouter from "./src/routes/admin/customer.js";


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

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/product-details", productDetailsRouter);
app.use("/reviews", reviewRouter);
app.use("/carts", cartRouter);

app.use("/admin/product-details", adminProductDetailsRouter);
app.use("/admin/products", adminProductRouter);
app.use("/admin/brands", adminBrandRouter);
app.use("/admin/categories", adminCategoryRouter);
app.use("/admin/category-typicals", adminCategoryTypicalDetails);
app.use("/admin/customers", adminCustomerRouter);



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});