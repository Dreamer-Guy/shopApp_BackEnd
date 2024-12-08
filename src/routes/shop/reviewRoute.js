import { createReview, getProductReviews } 
from "../../controllers/shop-controllers/review-controllers/reviewController.js";
import verifyUserJWT from '../../middlewares/verifyUserJWT.js';
import express from 'express';

const reviewRouter = express.Router();

reviewRouter.post('/', verifyUserJWT, createReview);
reviewRouter.get('/:productId', getProductReviews);

export default reviewRouter;
