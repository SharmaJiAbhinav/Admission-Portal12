const { text } = require("express");
const CourseModel = require("../models/course");
const nodemailer = require("nodemailer");

class CourseController {
  static courseInsert = async (req, res) => {
    try { 
        const {id}= req.userdata
        const{name,email,phone,dob,address,gender,qualification,course}=req.body
        const result = new CourseModel({
            name:name,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            gender:gender,
            qualification:qualification,
            course:course,
            user_id:id
        })
        await result.save()
        res.redirect('/courseDisplay')
    } catch (error) {
        console.log(error)
    }
  };

  static courseDisplay=async(req,res)=>{
    try {
        const {id,name,image} = req.userdata 
        const data = await CourseModel.find({user_id:id})
        // console.log(data)
        res.render("course/display", {d:data,n:name,i:image })
    } catch (error) {
        console.log(error)
    }
}

static courseView =async(req,res)=>{
    try {
        const {id,name,image} = req.userdata 
        const data = await CourseModel.find()
        // console.log(data)
        res.render("course/View",{d:data,n:name,i:image })
    } catch (error) {
        console.log(error)
    }
}

  static courseEdit = async (req, res) => {
    try {
    } catch (error) {}
  };

  static courseUpdate = async (req, res) => {
    try { 
        
        const{name,email,phone,dob,address,gender,qualification,course}=req.body
        const {id}= req.params.id
        const update = await CourseModel.findByIdAndUpdate( id,{
            name:name,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            gender:gender,
            qualification:qualification,
            course:course,
            
        })
        res.redirect('/courseDisplay')
    } catch (error) {
        console.log(error)
    }
  };

  static courseDelete = async (req, res) => {
    try {
    } catch (error) {}
  };

  static sendEmail = async (name, email, course) => {
    //console.log(name,email,status,comment)
    //connect with the smtp server

    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        auth: {
          user: "abhinavsharma5215@gmail.com",
          pass: "fmeevrvycnjuuqvk",
        },
    });
        let info = await transporter.sendEmail({
        from: "test@gmail.com",  //sender address
        to: email, //list of receivers
        subject: ` Course ${course}`,  //subject line
        text: "hello", //plain text body
        html: `<b>${name}</b>Course <b>${course}</b> insert successsful! <br>`, // html body
      });
  };
}

module.exports = CourseController;
