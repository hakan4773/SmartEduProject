exports.getİndexPge=(req, res) => {
  console.log(req.session.userID)
    res.status(200).render('index',{
      Page_Name:"index"
    });
  }
  exports.getAboutPage =  (req, res) => {
    res.status(200).render('about',{
      Page_Name:"about"
    });
  }
  
  exports.getRegisterPage =  (req, res) => {
    res.status(200).render('register',{
      Page_Name:"register"
    });
  }
  exports.getLoginPage =  (req, res) => {
    res.status(200).render('login',{
      Page_Name:"login"
    });
  }
  