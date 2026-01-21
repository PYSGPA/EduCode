const Otp = require("../models/Otp.js");
const User = require("../models/User.js");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');

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

    const otpGenerated = await Otp.create({ email, otp});
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

//changePassword
