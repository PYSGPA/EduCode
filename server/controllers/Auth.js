const Otp = require("../models/Otp.js");
const User = require("../models/User.js");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//sendOtp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const userexist = await User.findOne({email});
    if(userexist){
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
    }

    let otp = otpGenerator.generate(6);

    let result = await User.findOne({otp});
    while(result){
      otp = otpGenerator.generate(6);
      result = await User.findOne({otp});
    }

    const otpGenerated = await Otp.create({ email, otp });
    res.status(200).json({
      success: true,
      data:otpGenerated,
      message: "otp sent successfully"
    });

  } catch (err) {
    console.log(`error occurs while sending otp, ${err}`);
    res.status(500).json({
      success: false,
      message: "otp didn't send",
    });
  }
};

//signup
exports.Signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp
    } = req.body;

    if(!email,!password,!confirmPassword, !firstName, !lastName, !contactNumber){
      return res.status(401).json({
          success:false,
          message:"user details missing"
      });
    };

    if(password !== confirmPassword){
      return res.status(401).json({
        success:false,
        message:"password not match"
      });
    };

    const userexist = await User.findOne({email});
    if(userexist){
      return res.status(401).json({
        success:false,
        message:"user already exists"
      });
    };

    password = bcrypt.hash(password,10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      accountType,
      contactNumber
    });
    if (!user) {
      return console.log("user not created somthing went wrong");
    }
    res.status(200).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(`error occurs while user signup, ${err}`);
    res.status(500).json({
      success: false,
      message: "User not created",
    });
  }
};


//login

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if(!email,!password){
      return res.status(401).json({
          success:false,
          message:"login details missing"
      });
    };

    const userexist = await User.findOne({email});
    if(!userexist){
      return res.status(401).json({
        success:false,
        message:"user doesn't exists, please signup first"
      });
    };

    const loginCredentrials = bcrypt.compare(password,userexist.password);

    if(!loginCredentrials){
      return res.status(401).json({
        success:false,
        message:"login credentials are incorrect, please retry with correct credentials."
      });
    };

    const payload = {
      name: userexist.firstName,
      email: email,
      accountType: userexist.accountType
    }
    const token = jwt.sign(payload,SECRET_KEY,{expiresIn: "2h"});

    if(!token){
      return res.status(401).json({
        success:false,
        message:"token not created something went wrong"
      });
    }

    userexist.token = token;
    userexist.password = null;//hiding password

    res.cookie('token', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/'
    }).status(200).json({
      success: true,
      data: userexist,
      message: "User login successfully",
    })

  } catch (err) {
    console.log(`error occurs while user login, ${err}`);
    res.status(500).json({
      success: false,
      message: "something went wrong while login",
    });
  }
};

//changePassword

exports.changePassword = async(req,res)=>{
  
};
