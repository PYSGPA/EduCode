const mailSender = require('../utils/nodemailerConfig.js');

//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    try{
        const email = req.body;
    
        const resetToken = mailSender(email,"Password Token Generated", `please use the token to reset your password`);

        if(!resetToken){
            return res.status(401).json({
                success:false,
                message:"Reset Password link not sent"
            });
        };

        res.status(200).json({
            success:true,
            message:"Reset Password link sent"
        });
    }catch(err){
        console.log("somthing went wrong while senting reset link",err);
        res.status(401).json({
            success:false,
            message:"Reset Password link not sent"
        });
    }
};

//resetPassword
exports.resetPassword = async(req,res)=>{
    
};