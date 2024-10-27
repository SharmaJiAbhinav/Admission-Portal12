const UserModel = require("../models/User");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CourseModel = require('../models/course')

cloudinary.config({
  cloud_name: "dqobixxm9",
  api_key: "478599491144962",
  api_secret: "Br5K13sPq5mCOJ2NNbTQDegis50", // Click 'View API Keys' above to copy your API secret
});

class FrontController {
  static home = async (req, res) => {
    try {
      // res.send("home page") previous code
      // const { name, image, email, id,role } = req.userdata;
      const { name, image, email,id } = req.userdata;
      const btech = await CourseModel.findOne({user_id: id, course:"btech"});
      const bca = await CourseModel.findOne({user_id: id, course:"bca"});
      const mca = await CourseModel.findOne({user_id: id, course:"mca"});
      // console.log(btech)
      // res.render("home", { n: name, i: image, e: email, btech: btech, bca: bca, mca: mca,r:role });
      res.render("home", { n: name, i: image, e: email, btech: btech, bca: bca, mca: mca});
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      // res.send("login page")
      res.render("login", {
        msg: req.flash("success"),
        msg1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.userdata;
      res.render("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static userInsert = async (req, res) => {
    try {
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });
      // console.log(user)
      if (user) {
        req.flash("error", "Email already Exit");
        res.redirect("/register"); //url
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const file = req.files.image;
            const imageUpload = await cloudinary.uploader.upload(
              file.tempFilePath,
              {
                folder: "profile",
              }
            );
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            //To save data
            await result.save();
            req.flash("success", "Register Successfull Insert ! Plz Login");
            res.redirect("/");
          } else {
            req.flash("error", "Password & Confirm Password must be same.");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All Fields are Required.");
          res.redirect("/register");
        }
      }

      // const result = new UserModel({
      //   name:n,
      //   email:e,
      //   password:p,
      //   image:{
      //     public_id:imageUpload.public_id,
      //     url:imageUpload.secure_url

      //   }
      // })
      // await result.save()
      // res.redirect('/') //route ka url
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      //  console.log(user)
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          if (user.role == "admin") {
            //token create
            var token = jwt.sign({ ID: user._id }, "dkjfcj873nmd98qjkmnz8uwsj");
            // console.log(token)
            res.cookie("token", token);

            res.redirect("/admin/dashboard");
          }
          if (user.role == "user") {
            //token create
            var token = jwt.sign({ ID: user._id }, "dkjfcj873nmd98qjkmnz8uwsj");
            res.cookie("token", token);
            res.redirect("/home");
          }
        } else {
          req.flash("error", "Email or password is not valid.");
          res.redirect("/");
        }
      } else {
        req.flash("error", "You are not a registered user.");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      // res.send("contact page")
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  //profile
  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.userdata;
      res.render("profile", {
        n: name,
        i: image,
        e: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id } = req.userdata;
      console.log(req.body);
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current Password is incorrect");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Update successfully");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "All field are required");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
       const {id} = req.userdata;
       const {name, email, role} = req.body;
       if(req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
          console.log(imageID);

          //deleting image from cloudinary
          await cloudinary.uploader.destroy(imageID);
          // new image update
          const imagefile = req.files.image;
          const imageUpload = await cloudinary.uploader.upload(
            imagefile.tempFilePath,
            {
              folder: "userprofile",
            }
          )
          var data = {
            name : name,
            email: email,
            image: {
              public_id: imageUpload.public_id,
              url: imageUpload.secure_url,
            },
          };
        
       } else {
        var data = {
          name: name,
          email: email,
        };
       }
        
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile"); 
    }  catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
