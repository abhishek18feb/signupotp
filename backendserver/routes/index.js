var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/sendsignupemail', function(req, res, next){
  console.log(req.body)
  if('abhi@yopmail.com'===req.body.emailOrPhone || '9876543210'===req.body.emailOrPhone){
    res.status(200)
        .json({
                data: true, 
                message: 'Enter otp'
              })
  }else{
    res.status(401).json({ 
                          message:'Something went wrong' 
                        })
  }
  
})

module.exports = router;
