const User = require('../models/users');
const Mentor = require('../models/mentors');
const bcrypt = require('bcrypt');
// const signupjs = require('../public/js/signup');
var mongoose = require('mongoose');
const loadhome = async (req, res) => {
    try {
        res.render('home');
    }
    catch (error) {
        console.log(error.messagee);
    }
}


const loginload = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const verifylogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        const mentor = await Mentor.findOne({ email: email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                req.session.user_id = user._id;

                res.redirect('/home2');
            }
            else {
                res.render("login", { message: "enter the correct credentials" });
            }
        }
        else if (mentor) {
            const mentorpassword = await bcrypt.compare(password, mentor.password);

            if (mentorpassword) {
                req.session.mentor_id = mentor._id;
                console.log("mentor found");
                res.redirect('/home2');
            } else {

                res.render("login", { message: "enter the correct credentials" });
            }
        }
        else {
            res.render("login", { message: "email id not registred !! sign up  and then login" });

        }
    }

    catch (error) {
        console.log(error.message);
    }
}

const loadwho = async (req, res) => {
    try {
        res.render('who');

    } catch (error) {
        console.log(error.message);
    }
}

const loadsignup = async (req, res) => {
    try {

        res.render('signup');
    } catch (error) {
        console.log(error.message);
    }
}

const loadmentorsignup = async (req, res) => {
    try {
        res.render('mentorsignup');
    } catch (error) {
        console.log(error.message);
    }
}
const insertuser = async (req, res) => {
    try {

        const spassword = await seucurepassword(req.body.password);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            branch: req.body.branch,
            year: req.body.year,
            skill1: req.body.skill1,
            skill2: req.body.skill2,
            skillrequired1: req.body.skillrequired1,
            skillrequired2: req.body.skillrequired2,
            social_id: req.body.social_id

        });


        const userdata = await user.save();



        if (userdata) {

            res.render('login', { message: "registration successfull!! login with your registered credentials" });

        }
        else {
            res.render('registration', { message: "registration not done" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const insertmentor = async (req, res) => {
    try {

        const spassword = await seucurepassword(req.body.password);
        const user = new Mentor({
            name: req.body.name,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            Designation: req.body.Designation,
            Expert_field: req.body.Expert_field,
            Experience: req.body.Experience,
            social_id: req.body.social_id

        });


        const userdata = await user.save();



        if (userdata) {

            res.render('login', { message: "registration successfull!! login with your registered credentials" });

        }
        else {
            res.render('registration', { message: "registration not done" });
        }
    } catch (error) {
        console.log(error.message);
    }
}


const userlogout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
    }
}

const seucurepassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}
const loadhome2 = async (req, res) => {
    try {
        const yearfilter = req.query.yearfilter;
        const skillsfilter = req.query.skillsfilter;
        if (req.session.user_id) {
            if (yearfilter && skillsfilter) {
                const userData = await User.findById({ _id: req.session.user_id });
                const allprofiles = await User.find({ year: yearfilter,  $or :[ {skill1 :skillsfilter } , {skill2 :skillsfilter }]});
                res.render('home2', { User: userData, profiles: allprofiles });


            } else if (skillsfilter) {
                const userData = await User.findById({ _id: req.session.user_id });
                const allprofiles = await User.find({ $or :[ {skill1 :skillsfilter } , {skill2 :skillsfilter }]});
                res.render('home2', { User: userData, profiles: allprofiles });
            } else if (yearfilter) {
                const userData = await User.findById({ _id: req.session.user_id });
                const allprofiles = await User.find({ year: yearfilter });
                res.render('home2', { User: userData, profiles: allprofiles });



            } else {

                const userData = await User.findById({ _id: req.session.user_id });
                const allprofiles = await User.find();


                res.render('home2', { User: userData, profiles: allprofiles });

            }
        }
        else {

            if (yearfilter && skillsfilter) {
                const mentordata = await Mentor.findById({ _id: req.session.mentor_id });
                const allprofiles = await User.find({ year: yearfilter, $or :[ {skill1 :skillsfilter } , {skill2 :skillsfilter }]} );
                res.render('home2', { profiles: allprofiles, mentor: mentordata });


            } else if (skillsfilter) {
                const mentordata = await Mentor.findById({ _id: req.session.mentor_id });
                const allprofiles = await User.find({ $or :[ {skill1 :skillsfilter } , {skill2 :skillsfilter }]});
                res.render('home2', { profiles: allprofiles, mentor: mentordata });
            } else if (yearfilter) {
                const mentordata = await Mentor.findById({ _id: req.session.mentor_id });
                const allprofiles = await User.find({ year: yearfilter });
                res.render('home2', { profiles: allprofiles, mentor: mentordata });


            }
            else {
                const mentordata = await Mentor.findById({ _id: req.session.mentor_id });

                const allprofiles = await User.find();

                res.render('home2', { profiles: allprofiles, mentor: mentordata });
            }
        }


    } catch (error) {
        console.log(error.messagee);
    }
}




//user profile edit and update
const editload = async (req, res) => {
    try {
        const id = req.query.id;
        const userdata = await User.findById({ _id: id });
        const mentordata = await Mentor.findById({ _id: id });
        if (userdata) {

            res.render('editprofile', { User: userdata });
        }
        else if (mentordata) {

            res.render('editmentor', { mentor: mentordata });
        }
        else {
            res.redirect('/home2');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updateprofile = async (req, res) => {
    try {
        if (req.session.user_id) {
            if (req.file) {
                const userdata = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, image: req.file.filename, branch: req.body.branch, year: req.body.year, skill1: req.body.skill1, skill2: req.body.skill2, skillrequired1: req.body.skillrequired1, skillrequired2: req.body.skillrequired2, social_id: req.body.social_id } });
            } else {
                const userdata = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, branch: req.body.branch, year: req.body.year, skill1: req.body.skill1, skill2: req.body.skill2, skillrequired1: req.body.skillrequired1, skillrequired2: req.body.skillrequired2, social_id: req.body.social_id } });
            }
        } else {

            if (req.file) {
                const mentordata = await Mentor.findByIdAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, email: req.body.email, image: req.file.filename, Designation: req.body.Designation, Expert_field: req.body.Expert_field, Experience: req.body.Experience, social_id: req.body.social_id } });
            } else {
                console.log(req.query.id);

                const mentordata = await Mentor.findByIdAndUpdate({ _id: req.query.id }, { $set: { name: req.body.name, email: req.body.email, Designation: req.body.Designation, Expert_field: req.body.Expert_field, Experience: req.body.Experience, social_id: req.body.social_id } });
            }
        }

        res.redirect('/home2')
    } catch (error) {
        console.log(error.message);
    }
}


const viewprofile = async (req, res) => {
    try {
        const id = req.query.id;

        const viewprofile = await User.findById({ _id: id });
        if (viewprofile) {
            res.render('viewprofile', { profile: viewprofile });

        }
        else {
            const viewprofile = await Mentor.findById({ _id: id });
            res.render('viewprofile', { mentor: viewprofile });
        }


    } catch (error) {
        console.log(error.message);
    }
}

const mentorprofiles = async (req, res) => {
    try {

        if (req.session.user_id) {
            const userData = await User.findById({ _id: req.session.user_id });
            const allprofiles = await Mentor.find();

            res.render('home2', { User: userData, mentorprofiles: allprofiles });
        } else {


            const mentordata = await Mentor.findById({ _id: req.session.mentor_id });

            const allprofiles = await Mentor.find();

            res.render('home2', { mentorprofiles: allprofiles, mentor: mentordata });
        }



    }


    catch (error) {
        console.log(error.message);
    }
}
module.exports = {

    loadhome,
    loginload,
    verifylogin,
    loadsignup,
    insertuser,
    userlogout,
    loadhome2,
    editload,
    updateprofile,
    viewprofile,
    loadwho,
    loadmentorsignup,
    insertmentor,
    mentorprofiles

}