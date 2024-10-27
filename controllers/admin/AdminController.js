const CourseModel = require("../../models/course");
const UserModel = require("../../models/User");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static display = async (req, res) => {
    try {
      const data = await UserModel.find();
      //console.log(data)
      res.render("admin/display", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static adduser = async (req, res) => {
    try {
      res.render("admin/adduser");
    } catch (error) {
      console.log(error);
    }
  };

  static viewUser = async (req, res) => {
    try {
      const id  = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id)
      //console.log(data)
      res.render("admin/viewUser",{d:data});
    } catch (error) {
      console.log(error);
    }
  };
  static EditUser = async (req, res) => {
    try {
      const id  = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id)
      //console.log(data)
      res.render("admin/EditUser",{d:data});
    } catch (error) {
      console.log(error);
    }
  };

  static UpdateUser = async (req, res) => {
    try {
      const id  = req.params.id;
      const {n,e,p} = req.body
      //console.log(id)
      const data = await UserModel.findByIdAndUpdate(id,{
        name:n,
        email:e,
        password:p

      })
      res.redirect('/admin/studentDisplay') //route
     
    } catch (error) {
      console.log(error);
    }
  };

  static DeleteUser = async (req, res) => {
    try {
      const id  = req.params.id;
      
      //console.log(id)
      const data = await UserModel.findByIdAndDelete(id)
      res.redirect('/admin/studentDisplay') //route
     
    } catch (error) {
      console.log(error);
    }
  };

  static userInsert = async (req, res) => {
    try {
      // res.send("contact page")
      //console.log(req.body);
      console.log(req.files)
      console.log(imageUpload)
      console.log(file)
    
      // const {n, e, p,cp }= req.body
      // const result = new UserModel({
      //   name:n,
      //   email:e,
      //   password:p,
        
      // })
      // await result.save()
      // res.redirect('/admin/studentDisplay') //route ka url

    } catch (error) {
      console.log(error);
    }
  };

  /* course display */
   static courseDisplay = async(req,res) => {
    try{
      const data = await CourseModel.find()
      //console.log(data)
      res.render('admin/course/display', {d:data});
    } catch(error) {
      console.log(error)
    }
   }


   static statusUpdate = async(req,res) => {
    try{
      const {name, email, status, comment} = req.body;
      const id = req.params.id;
      await CourseModel.findByIdAndUpdate(id,{
      status: status,
      Comment: comment,   
      });
      this.sendEmail(name,email,status,comment);
      res.redirect("/admin/courseDisplay");
    } catch(error) {
      console.log(error)
    }
   };

   static sendEmail = async (name, email, course,status) => {
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
        html: `<b>${name}</b>Course <b>${status}</b>  successsful! <br>
        <b>Comment from Admin</b> ${comment}`, // html body
      });
  };
}

module.exports = AdminController;
