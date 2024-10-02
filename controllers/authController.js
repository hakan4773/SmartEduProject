const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category=require("../models/Category");
const Course = require('../models/Course');
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login")
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const same = bcrypt.compare(password, user.password);
    if (!same) {
      return res.status(401).send('Invalid password');
    }
    req.session.userID = user._id;
    return res.status(200).redirect('/users/dashboard');
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
<<<<<<< HEAD
  try{
    const user = await User.findOne({ _id: req.session.userID }); 
    const categories=await Category.find()
    const courses=await Course.find({user:req.session.userID})

    res.status(200).render('dashboard', {
      Page_Name: 'dashboard',
      user,
      categories,
      courses
    })
=======
  try {
<<<<<<< HEAD
    const user = await User.findOne({ _id: req.session.userID });
    res.status(200).render('dashboard', {
      Page_Name: 'dashboard',
      user,
=======
    const user = await User.findOne({ _id: req.session.userID }); 
    const categories=await Category.find()
    const courses=await Course.find({user:req.session.userID})

    res.status(200).render('dashboard', {
      Page_Name: 'dashboard',
      user,
      categories,
      courses
>>>>>>> parent of 6f5c1b0 (Revert "lesson 08")
    });
>>>>>>> 4cb4e4ff423ac3b043f22cff937fc334acfc4fd6
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
}
}
