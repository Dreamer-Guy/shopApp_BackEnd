import reviewController
from "../../controllers/shop-controllers/review-controllers/reviewController.js";
import verifyUserJWT from '../../middlewares/verifyUserJWT.js';
import express from 'express';

const reviewRouter = express.Router();

reviewRouter.post('/', verifyUserJWT, reviewController.createReview);
reviewRouter.get('/:productId', reviewController.getProductReviews);
reviewRouter.get('/user/:id', reviewController.getReviewByUserId);
reviewRouter.delete('/:id', verifyUserJWT, reviewController.deleteReview);


export default reviewRouter;
