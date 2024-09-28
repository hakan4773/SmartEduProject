exports.getİndexPge=(req, res) => {
    res.status(200).render('index',{
      Page_Name:"index"
    });
  }
  exports.getAboutPage =  (req, res) => {
    res.status(200).render('about',{
      Page_Name:"about"
    });
  }