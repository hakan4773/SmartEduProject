const express = require('express');
const ejs=require("ejs")
const app = express();
const mongoose=require("mongoose");
const pageRouter =require("./routes/pageRouter")
const courseRouter =require("./routes/courseRoute")
const categoryRouter =require("./routes/categoryRouter");

//template engine
app.set("view engine","ejs")

mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connection successfull'));

//middleware
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
