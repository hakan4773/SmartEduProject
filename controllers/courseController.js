const Course=require("../models/Course")
const Category=require("../models/Category")
exports.createCourse= async (req,res)=>{

try {

    const course =await Course.create(req.body)
    res.status(201).json({
        status: "success",
        course
     }) 
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
        const course=await Course.findOne({slug:req.params.slug})
    res.status(200).render("course",{
        course,
        Page_Name:"courses"
    })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
         })  
    }
    
    }