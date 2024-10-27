const express = require("express");
const app = express();
const Port = 3000;
const web = require("./routes/web");
const connectDb = require("./db/ConnectDb.js");
const fileUpload = require("express-fileupload");
const cookieparser = require('cookie-parser')
app.use(cookieparser())



//html css set
app.set("view engine", "ejs");

//css image link
app.use(express.static("public"));

//fileupload image
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    //    // dir for windows PC
    //     tempFileDir: path.join(__dirname, './tmp'),
  })
);

//connect flash and sessions
const session = require("express-session");
const flash = require("connect-flash");
//messages
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

//flash messages
app.use(flash());
//data get krne ke liye
app.use(express.urlencoded({ extended: false }));


//connect db
connectDb();

//routing
app.use("/", web);

////server create
app.listen(Port, () => {
  console.log(`Server start localhost: ${Port}`);
});
//routeing
//    app.get('/', (req, res) => {
//     res.send('Hello World!')
//    })

//    app.get('/aboutt', (req, res) => {
//     res.send('about page')
//    })
