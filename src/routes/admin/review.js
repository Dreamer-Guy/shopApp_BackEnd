import reviewController from "../../controllers/admin-controllers/reviewController.js";
import express from "express";

const router = express.Router();

router.get('/products', reviewController.getProductsWithReviews);
router.get('/product/:productId', reviewController.getProductReviewDetails);
router.post('/:reviewId/reply', reviewController.replyToReview);

export default router;