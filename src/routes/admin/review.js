import reviewController from "../../controllers/admin-controllers/reviewController.js";
import express from "express";
import adminVerify from "../../middlewares/adminVerify.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";

const router = express.Router();

router.get('/products', verifyUserJWT,adminVerify,reviewController.getProductsWithReviews);
router.get('/product/:productId', verifyUserJWT,adminVerify,reviewController.getProductReviewDetails);
router.post('/:reviewId/reply', verifyUserJWT,adminVerify,reviewController.replyToReview);

export default router;