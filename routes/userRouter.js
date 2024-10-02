const express=require("express")
const authController=require("../controllers/authController")
const authMiddlewares=require("../Middlewares/authMidlewares")

const router=express.Router();

router.route("/signup").post(authController.createUser)
router.route("/login").post(authController.LoginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddlewares,authController.getDashboard)

module.exports=router;