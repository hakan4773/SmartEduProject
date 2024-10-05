const bcrypt = require('bcrypt');
const User = require('../models/User');
const {validationResult}=require("express-validator");
const Category=require("../models/Category");
const Course = require('../models/Course');
exports.createUser = async (req, res) => {
  const errors = validationResult(req)

if(!errors.isEmpty()){
  errors.array().forEach((err)=>{
    req.flash("error",`${err.msg}`)
  })
  return  res.status(400).redirect("/register")
}
  
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login")
  } catch (error) {
   
    req.flash("error", "An error occurred while creating the user");
    return  res.status(400).redirect("/register")

  }
};
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error","User not found")
      return res.status(200).redirect('/login');
    }
    const same = await bcrypt.compare(password, user.password);
    if (!same) {
      req.flash("error","Your Password is not Correct")
      return res.status(200).redirect('/login');
    }
    else{
      req.session.userID = user._id;
      return res.status(200).redirect('/users/dashboard');
    }

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.getDashboard = async (req, res) => {

  try {
    const user = await User.findOne({ _id: req.session.userID }).populate("courses"); 
    const categories=await Category.find()
    const courses=await Course.find({user:req.session.userID}).sort("-createdAt")
    console.log(user.courses);
    res.status(200).render('dashboard', {
      Page_Name: 'dashboard',
      user,
      categories,
      courses
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
}
}
