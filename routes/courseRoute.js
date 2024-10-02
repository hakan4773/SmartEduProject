const express=require("express")
const courseController=require("../controllers/courseController")
<<<<<<< HEAD
const middleWears=require("../Middlewares/roleMiddlewears");
=======
>>>>>>> parent of 6f5c1b0 (Revert "lesson 08")
const roleMiddlewears = require("../Middlewares/roleMiddlewears");
const router=express.Router();

router.route("/").post(roleMiddlewears(["teacher", "admin"]),courseController.createCourse)
router.route("/").get(courseController.getAllCourse)
router.route("/:slug").get(courseController.getCourse)

module.exports=router;