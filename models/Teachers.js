const mongoose = require('mongoose')

 const TeacherSchema = mongoose.Schema({
       name:{
           type: String,
           Required: true,
       },

       email:{
          type: String,
          Required: true,
       },

       password:{
        type: String,
        Required: true,
       },

       role:{
        type:String,
        default: 'teacher',
       },
 }, {timestamps: true})

    const TeacherModel = mongoose.model('teacher',TeacherSchema)
    module.exports = TeacherModel