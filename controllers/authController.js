const User = require('../models/User');
const bcrypt = require('bcrypt');
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
  try {
    const user = await User.findOne({ _id: req.session.userID });
    res.status(200).render('dashboard', {
      Page_Name: 'dashboard',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
