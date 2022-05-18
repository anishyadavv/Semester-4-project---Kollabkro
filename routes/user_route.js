const express =  require('express');
const signup_route = express();
const session = require('express-session');
const auth = require("../middleware/auth");
const config = require("../config/config")
const multer = require("multer");
const path = require('path');
const usercontroller = require("../controllers/usercontroller");



signup_route.set('view engine','ejs');
signup_route.set('views','./views');

const bodyparser = require('body-parser');
// const { sign } = require('crypto');
signup_route.use(session({secret:config.sessionsecret}));
signup_route.use(bodyparser.json());
signup_route.use(bodyparser.urlencoded({extended: true}));
signup_route.use(express.static('public'));
 const storage = multer.diskStorage({
     destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userimages'));
     },
     filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
     }
 })

 const upload = multer({storage:storage});

 signup_route.get('/',usercontroller.loadhome);
 
//about
signup_route.get('/about', function(req,res){
   res.render('about');
});

 signup_route.get("/login",auth.islogout,usercontroller.loginload);

 signup_route.post("/login",usercontroller.verifylogin);

 signup_route.get("/who",auth.islogout,usercontroller.loadwho);

signup_route.get('/signup',auth.islogout,usercontroller.loadsignup);

signup_route.get('/mentorsignup',auth.islogout,usercontroller.loadmentorsignup);

signup_route.post('/mentorsignup',upload.single('image'),usercontroller.insertmentor);

signup_route.post('/signup',upload.single('image'),usercontroller.insertuser);

signup_route.get("/home2" ,usercontroller.loadhome2);

// signup_route.post("/home2",auth.islogin,usercontroller.loadhome2);

signup_route.get('/logout',auth.islogin,usercontroller.userlogout);

signup_route.get('/editprofile' ,auth.islogin , usercontroller.editload);

signup_route.post('/editprofile',upload.single('image'),usercontroller.updateprofile);

signup_route.get('/viewprofile',auth.islogin, usercontroller.viewprofile);


signup_route.get('/mentorprofiles',auth.islogin,usercontroller.mentorprofiles);
 module.exports = signup_route;