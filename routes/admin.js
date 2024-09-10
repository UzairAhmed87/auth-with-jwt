const express = require("express")
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router()
const isAdminMiddleware = require("../middleware/isAdmin")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

router.post("/signup",isAdminMiddleware,(req,res)=>{
const username = req.body.username;
const password = req.body.password;

Admin.create({
    username : username,
    password : password

})
.then(()=>{
res.json({
    mesg : "Admin created successfully"
})
}).catch(()=>{
    res.json({
        mesg : "Could not create Admin"
    })
})

})

router.post("/signin",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
     

    const adminpresent = await Admin.findOne({
        username,
        password
    }).then((data)=>{
        if (data) {
            const token =  jwt.sign({
                username
            },JWT_SECRET);
            res.json({
                token
            })
        }else{
            res.json({
                mesg : "Admin doesn't exist"
            })
        }
       
    }).catch((error)=>{
        console.log(error);
        
        
    })
})

router.post("/courses",adminMiddleware,async(req,res)=>{
const username = req.username;
if (username) {
    const title = req.body.title;
const description = req.body.description;
const price = req.body.price;
const imageLink = req.body.imageLink;

const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink
})
res.json({
    mesg : "Course created successfully",
    courseId : newCourse._id
})
}else{
res.json({
mesg : "Admin doesn't exist"
})
}


})

router.get("/courses",adminMiddleware,async(req,res)=>{
const allCourses = await Course.find({})
res.json({
    course : allCourses
})
})

module.exports = router