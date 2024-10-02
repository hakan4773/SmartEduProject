const express=require("express")
const courseController=require("../controllers/courseController")
<<<<<<< HEAD
=======
<<<<<<< HEAD
const middleWears=require("../Middlewares/roleMiddlewears");
=======
>>>>>>> parent of 6f5c1b0 (Revert "lesson 08")
>>>>>>> 4cb4e4ff423ac3b043f22cff937fc334acfc4fd6
const roleMiddlewears = require("../Middlewares/roleMiddlewears");
const router=express.Router();

router.route("/").post(roleMiddlewears(["teacher", "admin"]),courseController.createCourse)
router.route("/").get(courseController.getAllCourse)
router.route("/:slug").get(courseController.getCourse)

module.exports=router;