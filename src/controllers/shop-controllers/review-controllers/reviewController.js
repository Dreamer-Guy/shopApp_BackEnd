import reviewService from '../../../services/reviewService.js';
// import orderService from '../../services/orderService.js';       Kiểm tra đơn hàng người dùng
import productService from '../../../services/productService.js';
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const populateReview=(review)=>{
    const populatedReview={...review,
        createdAt:`${review.createdAt.getDate()}/${review.createdAt.getMonth()+1}/${review.createdAt.getFullYear()}`,
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
    if(!await productService.getProductById(req.body.productId)){
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
    if(validData){
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
        return res.status(SUCCESS_STATUS).send({
            review: savedReview,
        });
    } 
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;
        const reviews = await reviewService.getReviewsByProduct({
            productId,
            ratingFilter,
        });
        return res.status(SUCCESS_STATUS).send(reviews.map(review=>populateReview(review)));
    } 
    catch (e) {
        res.status(SERVER_ERROR_STATUS).send({
            message: 'Server error',
        });
    }
};


export { createReview, getProductReviews };