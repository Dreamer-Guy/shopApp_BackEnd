import reviewService from "../../services/reviewService.js";
import productService from "../../services/productService.js";
import Product from "../../models/Product.js";

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const populateReview = (review) => {
    const year = review.createdAt.getFullYear();
    const month = (review.createdAt.getMonth() + 1).toString().padStart(2, '0');
    const date = review.createdAt.getDate().toString().padStart(2, '0');
    return {
        ...review,
        createdAt: `${year}-${month}-${date}`
    };
};

const getProductsWithReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status || null;

        const { products, totalProducts } = await reviewService.getProductsWithReviewStatus(page, limit, status);
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(SUCCESS_STATUS).json({
            products,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error('Error in getProductsWithReviews:', error);
        return res.status(SERVER_ERROR_STATUS).json({
            message: error.message || 'Internal server error'
        });
    }
};

const getProductReviewDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(BAD_REQUEST_STATUS).send({
                message: 'Product not found'
            });
        }

        const reviews = await reviewService.getReviewsByProduct({
            productId,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        const totalReviews = await reviewService.getTotalReviewsByProduct(productId);
        const pendingReviews = reviews.filter(review => review.status === 'pending').length;
        
        const totalPages = Math.ceil(totalReviews / limit);
        
        return res.status(SUCCESS_STATUS).send({
            product: {
                _id: product._id,
                name: product.name,
                image: product.image,
                rating: product.rating
            },
            reviews: reviews.map(review => populateReview(review)),
            stats: {
                total: totalReviews,
                pending: pendingReviews,
                totalPages: totalPages,
                currentPage: parseInt(page)
            }
        });
    } catch (e) {
        console.error(e);
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error'
        });
    }
};

const replyToReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { content, adminId } = req.body;

        if (!content) {
            return res.status(BAD_REQUEST_STATUS).json({
                message: 'Reply content is required'
            });
        }

        if (!adminId) {
            return res.status(BAD_REQUEST_STATUS).json({
                message: 'Admin ID is required'
            });
        }

        const updatedReview = await reviewService.replyToReview(reviewId, adminId, content);
        
        return res.status(SUCCESS_STATUS).json(updatedReview);
    } catch (error) {
        console.error('Error in replyToReview:', error);
        return res.status(SERVER_ERROR_STATUS).json({
            message: error.message || 'Internal server error'
        });
    }
};

const reviewController = {
    getProductsWithReviews,
    getProductReviewDetails,
    replyToReview
};

export default reviewController;