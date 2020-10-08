const express = require('express')
const passport = require("passport");
const router = express.Router()
const {ensureGuest} = require('../helper/authHelper')


router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
    //   Successful authentication, redirect home.
      res.redirect("/newsfeed");
    }
  );
  router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
  });

  
  // router.get('/verify',(req,res)=>{
  //   if(req.user){
  //     console.log(req.user)
  //   }else{
  //     console.log('No Auth');
  //   }
  // })

module.exports = router