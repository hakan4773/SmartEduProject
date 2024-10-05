const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    req.flash("success",`${course.name} has been create succesfully`);
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash("error","something happened");
    res.status(400).redirect('/courses');
  }
};
exports.getAllCourse = async (req, res) => {
  try {
    const categoryslug = req.query.categories;
    console.log(categoryslug)
    const category = await Category.findOne({slug:categoryslug});

    let filter = {};
    if (categoryslug) {
      filter = { category: category._id };
    }
       const query=req.query.search
    if(query){
      filter={name:query}
    }

    if(!query && !categoryslug){
      filter.name="",
      filter.category=null
    }

    const courses = await Course.find({$or:[
      {name:{$regex:".*" + filter.name +".*", $options:"i"}},
      {category:filter.category}
    ]}).sort('-createdAt').populate("user");

    const categories = await Category.find();
    res.status(200).render('courses', {
      courses,
      categories,
      Page_Name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user=await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate('user');
    const categories = await Category.find();
    res.status(200).render('course', {
      course,
      categories,
      user,
      Page_Name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.EnrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id:req.body.course_id})
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse=async (req,res)=>{
try {
  const user=await User.findById(req.session.userID)
   await user.courses.pull({_id:req.body.course_id})
   await user.save();
   res.status(200).redirect('/users/dashboard')

} catch (error) {
  res.status(400).json({status:"fail",
    error
  })
}
}