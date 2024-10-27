const mongoose = require("mongoose");
const Local_Url = "mongodb://127.0.0.1:27017/admissionPortal";
const Live_url ='mongodb+srv://abhinavsharma5215:ram123@cluster0.gxmoh.mongodb.net/admissionPortal?retryWrites=true&w=majority&appName=Cluster0'

const connectDb = () => {
  return mongoose
    .connect(Live_url)
    .then(() => {
      console.log("Connect Success");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDb;
