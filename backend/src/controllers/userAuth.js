const dotenv=require('dotenv');
const jwt =require('jsonwebtoken');
const UserServices=require('../services/UserService');
const UserSchema=require('../models/UserSchema');

dotenv.config();

const secret=process.env.JWT_SECRET;
 const handleInvalidToken=async (res)=>{
    await UserServices.setCookieValue({
        userId:"",
        isUserAuth:"",
        userToken:"",
        days:0
    },
res);
return res.status(401).send({
    message:"Invalid token",
    isAuth:false
});
 };

 const isUserAuth= async (req,res,next)=>{
    const userId=req.cookies.usedId;
    const token=req.cookies.userToken;
    if (!token) {
        return handleInvalidToken(res);
    }
    try {
        const decoded=jwt.verify(token,secret);
        if (!decoded || userId!==decoded.userId ||!decoded.usedId) {
            return handleInvalidToken(res);
        }
        await UserServices.setCookieValue({
            userId:userId.id,
            userToken:token,
            isUserAuth:true,
            days:30// expires after 30 days
        },
    res);
    next();
    } catch (error) {
return handleInvalidToken(res);
    }
 };

 module.exports=isUserAuth;