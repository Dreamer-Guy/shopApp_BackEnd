import axios from "axios";
import userServices from "../../services/userService.js";
import { hashPassword } from "../../utils/hashAndCompare.js";
import { createToken } from "../../utils/createAndVerifyToken.js";

const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;

const GOOGLE_SECRET_STRING="Google";

const TOKEN_NAME = 'token';

const buildRedirectUri = () => {
    const CLIENT_ID = encodeURIComponent(process.env.OAUTH_GOOGLE_CLIENT_ID);
    const scope = encodeURIComponent(["profile", "email"].join(" "));
    const state = encodeURIComponent(process.env.OAUTH_STATE);
    const redirect_uri = encodeURIComponent(process.env.OAUTH_GOOGLE_CALLBACK_URL);
    const url = `${process.env.OAUTH_GOOGLE_OAUTH_URL}?access_type=offline&state=${state}&scope=${scope}&redirect_uri=${redirect_uri}&response_type=code&client_id=${CLIENT_ID}`;
    return url;
}

const isCallBackQueryValid = (req) => {
    const { code, state } = req.query;
    if (decodeURIComponent(state) !== process.env.OAUTH_STATE || !code) {
        return false;
    }
    return true;
};

const createUrlEncodedFormData = (code) => {
    const data = {
        client_id: process.env.OAUTH_GOOGLE_CLIENT_ID,
        client_secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.OAUTH_GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
    }
    return new URLSearchParams(data).toString();
}

const postGoogleTokenEndPoint = async (formData,headers) => {
    const res=axios.post(process.env.OAUTH_GOOGLE_TOKEN_URL, formData, { headers });
    return res;
};      

const getUserInfoByAccessToken = async (access_token) => {
    const res=await axios.get(process.env.OAUTH_GOOGLE_TOKEN_USER_URL, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
    });
    return res;
};

const createNewUserByGoogleUserInfoResponse=async(resUserInfo)=>{
    const hashedPassword=await hashPassword(GOOGLE_SECRET_STRING);
    const userData={
        fullName: resUserInfo.data.name,
        userName: resUserInfo.data.name + GOOGLE_SECRET_STRING,
        email: resUserInfo.data.email,
        password: hashedPassword,  
        avatar: resUserInfo.data.picture,
    }
    const user=userServices.createUser(userData);
    return user;
};

const redirectOauthGoogle = async (req, res) => {
    const url = buildRedirectUri();
    return res.redirect(url);
};


const authGoogleCallback = async (req, res) => {
    try {
        if (!isCallBackQueryValid(req)) {
            return res
            .status(BAD_REQUEST_STATUS)
            .redirect(`${process.env.FRONTEND_BASE_URL}`);
        }
        const { code } = req.query;
        const formData = createUrlEncodedFormData(code);
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        const resToken = await postGoogleTokenEndPoint(formData,headers);
        const { access_token } = resToken.data;
        const resUserInfo = await getUserInfoByAccessToken(access_token);
        const user=await userServices.getUserByEmailOrUserName(resUserInfo.data.email,null);
        if(user){
            //if user is already registered with google
            if(user.userName.includes(GOOGLE_SECRET_STRING)){
                const token=createToken(user);
                return res
                .status(SUCCESS_STATUS)
                .cookie(TOKEN_NAME, token, {
                    httpOnly: true,
                })
                .redirect(`${process.env.FRONTEND_BASE_URL}`);
            }
            //if user is already registered with email
            else{
                return res
                    .status(BAD_REQUEST_STATUS)
                    .redirect(`${process.env.FRONTEND_BASE_URL}`);
            }

        }   
        const newUser = await createNewUserByGoogleUserInfoResponse(resUserInfo);
        await userServices.saveUser(newUser);
        await userServices.updateLastTimeLogin(user);
        const token = createToken(newUser);
        return res
            .status(SUCCESS_STATUS)
            .cookie(TOKEN_NAME, token, {
                httpOnly: true,
            })
            .redirect(`${process.env.FRONTEND_BASE_URL}`);
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS)
        .redirect(`${process.env.FRONTEND_BASE_URL}`);
    }
};


export { redirectOauthGoogle, authGoogleCallback };