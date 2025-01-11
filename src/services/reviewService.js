import Review from '../models/Review.js';

const reviewService = {

    async createReview(reviewData){
        const reviews = new Review(reviewData);
        return reviews;
    },

    async saveReview(reviews){
        const saved=await reviews.save();
        return saved;
    },
    
    async getReviewsByProduct(productId, ratingFilter){
        const filter = { productId };

        if (ratingFilter) {
            filter.rating = ratingFilter;

            const reviews = await Review.find(filter).populate('userId').lean();
            return reviews;
        }

        const reviews = await Review.find(productId)
                .populate('userId')
                .sort({ rating: -1 })
                .lean();
        return reviews;

    },
    async getReviewsByUserId(userId,page,limit){
        const reviews = await Review
        .find({userId})
        .populate('productId')
        .skip((page-1)*limit)
        .limit(limit)
        .lean();
        const totalReviews = await Review.countDocuments({userId});
        const totalPages = Math.ceil(totalReviews/limit);
        const formattedReviews = reviews.map(review => ({
            comment:review.comment,
            rating:review.rating,
            productId:review.productId._id,
            productName:review.productId.name,
            productImage:review.productId.image,
            createdAt:review.createdAt,
        }));
        return {reviews:formattedReviews,totalReviews,totalPages};
    }
}

export default reviewService