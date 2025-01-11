import { get } from "http";
import { loginUser, registerUser,logoutUser,getLoginStatus } 
from "../../controllers/user-controllers/basicAuthenticate.js";
import { redirectOauthGoogle, authGoogleCallback } 
from "../../controllers/user-controllers/googleAuthenticate.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
import upload from "../../config/multer.js";
import express from "express";
import { updateUserProfile,changePassword } from "../../controllers/user-controllers/userController.js";
import { getAddressByUserId,updateAddress } from "../../controllers/shop-controllers/address-controllers/addressController.js";
import { requestReset, resetPassword, verifyToken } from "../../controllers/shop-controllers/auth-controllers/forgotPasswordController.js";
const userRouter = express.Router();
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/auth/google",redirectOauthGoogle);
userRouter.get("/auth/google/callback",authGoogleCallback);

userRouter.get("/status",verifyUserJWT,getLoginStatus);
userRouter.put("/updateProfile",verifyUserJWT,upload.single("avatar"),updateUserProfile);
userRouter.get("/address/:id",verifyUserJWT,getAddressByUserId);
userRouter.put("/updateAddress",verifyUserJWT,updateAddress);
userRouter.put("/changePassword",verifyUserJWT,changePassword);
userRouter.post("/forgot-password", requestReset);
userRouter.post("/verify-token", verifyToken);
userRouter.post("/reset-password", resetPassword);
export default userRouter;  
