import reviewService from '../../../services/reviewService.js';
// import orderService from '../../services/orderService.js';       Kiểm tra đơn hàng người dùng
import productService from '../../../services/productService.js';
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const populateReview=(review)=>{
    const year=review.createdAt.getFullYear();
    const month=(review.createdAt.getMonth()+1).toString().padStart(2,'0');
    const date=review.createdAt.getDate().toString().padStart(2,'0');
    const populatedReview={...review,
        createdAt:`${year}-${month}-${date}`,
    };
    return populatedReview;
};

const checkAndGetErrorMessageMissField = (req) => {
    const { productId, rating, comment } = req.body;
    if(!productId){
        return 'Missing productId';
    }
    if(!rating){
        return 'Missing rating';
    }
    if(!comment){
        return 'Missing comment';
    }
    return null;
};

const checkAndGetErrorMessageValidedData=async(req)=>{
    if(isNaN(req.body.rating)){
        return 'Invalid rating';
    }
    const isProductExistById=await productService.getProductById(req.body.productId);
    if(!isProductExistById){
        return 'Invalid productId';
    }
    return null;
};

const checkAndGetErrorMessageForValidation = async (req) => {
    const missFieldErrorMsg=checkAndGetErrorMessageMissField(req);
    if(missFieldErrorMsg){
        return missFieldErrorMsg;
    }
    const validDataErrorMsg=await checkAndGetErrorMessageValidedData(req);
    if(validDataErrorMsg){
        return validDataErrorMsg;
    };
    return null;
};  

const createReview = async (req, res) => {
    try {
        const errMessage=await checkAndGetErrorMessageForValidation(req);
        if(errMessage){
            return res.status(BAD_REQUEST_STATUS).send({
                message: errMessage,
            });
        }
        const reviewData = {
            productId: req.body.productId,
            userId: req.user._id,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        const review = await reviewService.createReview(reviewData);
        const savedReview=await reviewService.saveReview(review);
        await productService.updateByProductRating(reviewData.productId, savedReview.rating);
        console.log(savedReview);
        return res.status(SUCCESS_STATUS).send(populateReview(savedReview._doc));
    } 
    catch (e) {
        console.log(e.message);
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const {page=1,limit=5}=req.query;
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;
        const reviews = await reviewService.getReviewsByProduct({
            productId,
            ratingFilter,
            page,
            limit,
        });
        const totalReviews=await reviewService.getTotalReviewsByProduct(productId);
        return res.status(SUCCESS_STATUS).send({
            reviews:reviews.map(review=>populateReview(review)),
            totalReviews:totalReviews,
        });
    } 
    catch (e) {
        console.log(e.message);
        res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};
const getReviewByUserId=async(req,res)=>{
    try{
        const userId = req.params.id;
        const page = req.query.page || 1;
        const limit = req.query.limit || 5; 
        const data = await reviewService.getReviewsByUserId(userId,page,limit)
        return res.status(SUCCESS_STATUS).send(data)
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
}

const deleteReview=async(req,res)=>{
    try{
        const reviewId=req.params.id;
        const isOnwerDeleting=await reviewService.checkReviewOwner(req.user._id,reviewId);
        if(!isOnwerDeleting){
            return res.status(BAD_REQUEST_STATUS).send({
                message: 'You are not the owner of this review',
            });
        }
        const deletedReview=await reviewService.deleteReview(reviewId);
        await productService.updateProductAfterDeletingReview({productId:deletedReview.productId,rating:deletedReview.rating});
        return res.status(SUCCESS_STATUS).send(reviewId);
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};

const reviewController={
    createReview,
    getProductReviews,
    getReviewByUserId,
    deleteReview,
}

export default reviewController;