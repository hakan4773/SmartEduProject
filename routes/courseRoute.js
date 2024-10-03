const express=require("express")
const courseController=require("../controllers/courseController")
const roleMiddlewears = require("../Middlewares/roleMiddlewears");
const router=express.Router();

router.route("/").post(roleMiddlewears(["teacher", "admin"]),courseController.createCourse)
router.route("/").get(courseController.getAllCourse)
router.route("/:slug").get(courseController.getCourse)
router.route("/enroll").post(courseController.EnrollCourse)
router.route("/release").post(courseController.releaseCourse)

module.exports=router;