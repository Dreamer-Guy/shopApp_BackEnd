import Review from '../models/Review.js';
import Product from '../models/Product.js';

const reviewService = {

    async createReview(reviewData){
        const reviews = new Review(reviewData);
        return reviews;
    },

    async saveReview(reviews){
        const saved=await reviews.save();
        return saved;
    },
    
    async getReviewsByProduct({ productId, page, limit }) {
        try {
            const skip = (page - 1) * limit;
            const reviews = await Review.find({ productId })
                .populate('userId', 'fullName email')
                .populate('reply.staffId', 'fullName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();
                
            return reviews;
        } catch (error) {
            console.error('Error getting reviews:', error);
            throw error;
        }
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
    },

    async checkReviewOwner(userId,reviewId){
        const review = await Review.findById(reviewId);
        return review.userId.toString() === userId.toString();
    },

    async deleteReview(id){
        const deletedReview=await Review.findByIdAndDelete(id);
        return deletedReview;
    },

    async getTotalReviewsByProduct(productId) {
        try {
            const total = await Review.countDocuments({ productId });
            return total;
        } catch (error) {
            console.error('Error getting total reviews:', error);
            throw error;
        }
    },

    async getProductsWithReviewStatus(page, limit, status) {
        const matchCondition = {};
        
        if (status === 'pending') {
            matchCondition['reviews.status'] = 'pending';
        } else if (status === 'replied') {
            matchCondition['reviews.status'] = 'replied';
        }

        const totalProducts = await Product.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            {
                $match: matchCondition
            }
        ]).count('total');

        const products = await Product.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    pendingReviews: {
                        $size: {
                            $filter: {
                                input: '$reviews',
                                as: 'review',
                                cond: { $eq: ['$$review.status', 'pending'] }
                            }
                        }
                    },
                    averageRating: {
                        $avg: '$reviews.rating'
                    }
                }
            },
            {
                $match: matchCondition
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    reviewCount: 1,
                    pendingReviews: 1,
                    averageRating: 1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);

        return {
            products,
            totalProducts: totalProducts[0]?.total || 0
        };
    },

    async getProductReviewDetails(productId) {
        const reviews = await Review.find({ productId })
            .populate('userId', 'fullName email')
            .populate('reply.staffId', 'fullName')
            .sort({ createdAt: -1 })
            .lean();
            
        const product = await Product.findById(productId)
            .select('name image rating')
            .lean();
            
        const averageRating = reviews.length > 0 
            ? Number((reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1))
            : 0;

        return {
            product,
            reviews,
            stats: {
                total: reviews.length,
                average: averageRating,
                pending: reviews.filter(rev => rev.status === 'pending').length
            }
        };
    },

    async replyToReview(reviewId, adminId, content) {
        try {
            const review = await Review.findById(reviewId);
            if (!review) {
                throw new Error('Review not found');
            }

            review.reply = {
                content: content,
                staffId: adminId,
                createdAt: new Date()
            };
            review.status = 'replied';

            const updatedReview = await review.save();
            return await updatedReview.populate('reply.staffId', 'fullName');
            
        } catch (error) {
            console.error('Error in replyToReview service:', error);
            throw error;
        }
    }
}

export default reviewService;