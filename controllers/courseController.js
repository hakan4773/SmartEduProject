const Course=require("../models/Course")
const Category=require("../models/Category")
exports.createCourse= async (req,res)=>{
try {
<<<<<<< HEAD
    const course =await Course.create({ name: req.body.name,
        description: req.body.name,
        category: req.body.category,
        user: req.session.userID})
    res.status(201).redirect("/courses")
=======
    const course =await Course.create({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        user:req.session.userID
    })
    res.status(201).redirect('/courses'); 
>>>>>>> 4cb4e4ff423ac3b043f22cff937fc334acfc4fd6
} catch (error) {
    res.status(400).json({
        status: "fail",
        error
     })  
}
}
exports.getAllCourse= async (req,res)=>{
try {
    const categoryslug=req.query.categories
     const category=await Category.findOne({slug:categoryslug})

let filter={}
if(categoryslug){
    filter={category:category._id}
}
   

const courses=await Course.find(filter).sort("-createdAt") 
const categories=await Category.find()
res.status(200).render("courses",{
    courses,
    categories,
    Page_Name:"courses"
})
} catch (error) {
    res.status(400).json({
        status: "fail",
        error
     })  
}
}

exports.getCourse= async (req,res)=>{
    try {
<<<<<<< HEAD
        const course=await Course.findOne({slug:req.params.slug}).populate("user")
        const categories=await Category.find();
=======
        const course=await Course.findOne({slug:req.params.slug}).populate('user')
        const categories=await Category.find()

>>>>>>> 4cb4e4ff423ac3b043f22cff937fc334acfc4fd6
    res.status(200).render("course",{
        course,
        categories,
        Page_Name:"courses"
    })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
         })  
    }
    
    }