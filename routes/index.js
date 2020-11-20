var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Express' });
});

router.get('/assignment', function(req, res, next) {
  res.render('assignment', { title: 'Express' });
});

router.get('/progress', function(req, res, next) {
  res.render('progress', { title: 'Express' });
});

router.get('/newProfile', function(req, res, next) {
  res.render('newProfile', { title: 'Express' });
});

router.get('/bootcamp', function(req, res, next) {
  res.render('bootcamp', { title: 'Express' });
});
router.get('/schedule', function(req, res, next) {
  res.render('schedule', { title: 'Express' });
});
router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Express' });
});

router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword', { title: 'Express' });
});

router.get('/view_userfeedback', function(req, res, next) {
  res.render('view_userfeedback', { title: 'Express' });
});

router.get('/addassignment', function(req, res, next) {
  res.render('addassignment', { title: 'Express' });
});

router.get('/gradeassignment', function(req, res, next) {
  res.render('gradeassignment', { title: 'Express' });
});

router.get('/create/:classId', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.get('/assignments/:classId', function(req, res, next) {
  res.render('assignments', { title: 'Express' });
});

router.post('/sig1',function(req,res,next){
  const schedule_id = req.body.zid;

  axios.get("https://api.codeasylums.com"+`/allotment/${schedule_id}`)
  .then((response) => {
    console.log(response.data);
    let apiKey = response.data.api_key;
    let apiSecret = response.data.api_secret;
    let meetingNumber = response.data.meeting_id;
    const role=1;
    const passwd=123456;
    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  
    res.json({
      signature: signature,
      apiKey: apiKey,
      meetingNumber : meetingNumber,
      passwd:passwd
    })
  })
  .catch((err) => {
    console.log(err)
 });
})


module.exports = router;
