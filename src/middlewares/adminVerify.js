const UNAUTHORIZED_STATUS = 401;
const adminVerify = (req, res, next) => {
    const user=req.user;
    if(user.role!=="admin"){
        res.status(UNAUTHORIZED_STATUS)
        .send({message:"Unauthorized access"});
        return;
    };
    next();
};

export default adminVerify;