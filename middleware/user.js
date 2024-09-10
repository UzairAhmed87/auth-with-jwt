const jwt = require("jsonwebtoken")
const secret = require("../config")
function userMiddleware(req,res,next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
   const decodedValue =  jwt.verify(jwtToken,secret);  
if (!token) {
    return res.status(401).json({
        mesg : "Authorization header missing"
    })
}
   if (decodedValue && decodedValue.username) {
    req.username = decodedValue.username;
next()
   }else{
    res.status(403).json({
        mesg : "You are not authenticated"
    })
   }
 }

 module.exports = userMiddleware
