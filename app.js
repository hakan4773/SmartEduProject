const expres = require('express');
const ejs=require("ejs")
const app = expres();

//template engine
app.set("view engine","ejs")


//middleware
app.use(expres.static("public"))

app.get('/', (req, res) => {
  res.status(200).render('index',{
    Page_Name:"index"
  });
});
app.get('/about', (req, res) => {
    res.status(200).render('about',{
      Page_Name:"about"
    });
  });

  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
