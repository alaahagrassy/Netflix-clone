const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt_round = Number(process.env.salt_rounds);
const jwt = require("jsonwebtoken");
const util = require("util");
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);
const { Schema } = mongoose;
const { model } = mongoose;
const UserModel = new Schema({
  userName: {
    type: String
  },
  FirstName:{
    type:String
  },
  LastName:{
    type:String
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    index: {
      unique: [true, "this email is already taken"],
    },
  },
  password: {
    type: String,
    required: [true, "password required"],
  },
  cardNumber: {
    type: Number,
    // required: [true, 'Card Number required'],
  },
  expirationDate: {
    type: Date,
    // required:[true , 'expiration Date required']
  },
  securityCode: {
    type: Number,
    // required:[true , 'security Code required']
  },
  isAdmin: {
    type: Boolean,
    default: false,
},
avatar: {
    type: String,
},
isActive:{
  type:[Number]
},
plane:{
  type:String,
  enum : ['Basic' ,'Standard'  , 'Premmium']
},
device:{
  type:String
}
});

////hashing password
UserModel.pre("save", function (next) {
  var user = this;
  bcrypt.genSalt(salt_round, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

////comapre password
UserModel.methods.comparepassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

//generate token
UserModel.methods.generatToken = function () {
  return sign(
    {
      _id: JSON.stringify(this._id),
      userName: JSON.stringify(this.userName),
      email: JSON.stringify(this.email),
      cardNumber: JSON.stringify(this.cardNumber),
      expirationDate: JSON.stringify(this.expirationDate),
      securityCode: JSON.stringify(this.securityCode),
      isAdmin: JSON.stringify(this.isAdmin),
      isActive : JSON.stringify(this.isActive)
    },
    process.env.jwt_secret
  );
};

UserModel.statics.getCurrentUser = async function (token) {
  try {
    const decoded = await verify(token, process.env.jwt_secret);
    const currentUser = await this.findOne({
      email: JSON.parse(decoded.email),
    });
    currentUser._id = JSON.parse(decoded._id);
    currentUser.isAdmin = JSON.parse(decoded.isAdmin);
    currentUser.isActive = JSON.parse(decoded.isActive)
    if (!currentUser) throw new Error("user not found");
    return currentUser;
  } catch (err) {
     throw new Error("You are not Authorized ")
  }
};

module.exports = model("User", UserModel);
