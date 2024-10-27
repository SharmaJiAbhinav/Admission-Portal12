const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

const checkAuth =async(req,res,next)=>{
    // console.log("hello auth")
    const{token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error',"Unauthorised user please login")
        res.redirect('/')
    }else{
        const verifyToken = jwt.verify(token,'dkjfcj873nmd98qjkmnz8uwsj')
        const data = await UserModel.findOne({_id:verifyToken.ID})
        //console.log(data)
        req.userdata = data
        //console.log(verifyToken)
        next();
    }
}

module.exports =checkAuth