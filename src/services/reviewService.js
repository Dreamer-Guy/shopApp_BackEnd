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
    
}

export default reviewService