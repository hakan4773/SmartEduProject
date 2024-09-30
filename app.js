const express = require('express');
const ejs=require("ejs")
const app = express();
const mongoose=require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const pageRouter =require("./routes/pageRouter")
const courseRouter =require("./routes/courseRoute")
const categoryRouter =require("./routes/categoryRouter");
const userRouter=require("./routes/userRouter")

//template engine
app.set("view engine","ejs")

mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connection successfull'));

//middleware
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: 'my_keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/smartedu-db"})
}))


//global variable
global.userIN=null
//routes
app.use("*",(req,res,next)=>{//bu kısma daha sonra bak
userIN=req.session.userID
next();
})
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
