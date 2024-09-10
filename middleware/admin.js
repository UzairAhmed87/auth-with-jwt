const jwt = require("jsonwebtoken")
const secret = require("../config")
function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
   const decodedValue =  jwt.verify(jwtToken,secret);  

   if (decodedValue && decodedValue.username) {
    req.username = decodedValue.username
next()
   }else{
    res.status(403).json({
        mesg : "You are not authenticated"
    })
   }
 }

 module.exports = adminMiddleware
