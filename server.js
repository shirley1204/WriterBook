
const express = require("express");
const path = require('path')
const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const passport = require('passport')
const methodOverride = require("method-override");
const session = require('express-session')
// const flash = require('express-flash')
const cookieParser = require('cookie-parser')

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// how to use middleware
// app.use((req,res,next) => {
//     req.greetings = "hello"
//     return next()
// })
const Keys = require("./config/keys");
mongoose
  .connect(Keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//requiring mongoose model


//cookie parser
app.use(cookieParser())

// session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))


require('./config/passport')(passport)


//passport-session
app.use(passport.initialize());
app.use(passport.session());


const {
stripTags,
editIcon,
 } = require('./helper/authHelper')

//template setup
app.engine("handlebars", exphbs({
  helpers: {
  
    stripTags,
    editIcon: editIcon,
   
  },
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set("view engine", "handlebars");

//body parser setup

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//golabal variable 
app.use((req,res,next) => {
  
  res.locals.user = req.user || null
  next()
})
// Static folder
// app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static("./public"));

// method overirde

app.use(methodOverride("_method"));

// app.use('/', require('./routes/Profile'))
// app.use('/auth', require('./routes/Auth'))
// app.use('/content', require('./routes/Content'))


const Auth = require("./routes/Auth");
const Content = require("./routes/Content");
const Profile = require("./routes/Profile");
app.use("/", Auth, Content, Profile);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
});
