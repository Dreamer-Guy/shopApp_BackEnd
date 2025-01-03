import { get } from "http";
import { loginUser, registerUser,logoutUser,getLoginStatus } 
from "../../controllers/user-controllers/basicAuthenticate.js";
import { updateUserProfile } from "../../controllers/user-controllers/userController.js";
import { redirectOauthGoogle, authGoogleCallback } 
from "../../controllers/user-controllers/googleAuthenticate.js";
import verifyUserJWT from "../../middlewares/verifyUserJWT.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/auth/google",redirectOauthGoogle);
userRouter.get("/auth/google/callback",authGoogleCallback);

userRouter.get("/status",verifyUserJWT,getLoginStatus);
userRouter.put("/updateProfile",verifyUserJWT,updateUserProfile);
export default userRouter;  
