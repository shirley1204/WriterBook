const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../helper/authHelper')


const Content = require("../models/ContentModel");
const User = require("../models/UserModel")

router.get('/newsfeed',ensureAuthenticated,(req,res) => {
    res.render('newsfeed/index')
})

router.get('/addContent',(req,res)=>{
    res.render('content/addContent')
})

//edit

router.get("/edit/content/:id", (req, res) => {
    Content.findOne({ _id: req.params.id })
      .then((data) => {
        res.render("content/editContent", {
         content: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  //get contents
  router.get("/contents",ensureAuthenticated, (req, res) => {
    
    Content.find({userId: req.user.id})
      .sort({ date: "desc" })
      .then((data) => {
        
        res.render("content/viewContent", {
         content:data,
         title:data.title
          
         
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/read/PublicContent", (req, res) => {
    
    Content.find({ status: 'public'})
      .sort({ date: "desc" })
      .then((data) => {
        
        res.render("content/publicContent", {
         content:data,
        
     })
    })
      .catch((err) => {
        console.log(err);
      });
    });
  




  
  router.post("/addContent", (req, res) => {
    let allowComments;
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }

   const newContent = {
    userId:req.user.id,
     title:req.body.title,
    description:req.body.description,
    status:req.body.status,
    allowComments: allowComments,
    
   
      };
      const content = new Content(newContent);
   content
        .save()
        .then((data) => {
       console.log(data)
       
        
          res.redirect("/contents");
        })
        .catch((err) => console.log(err));
    
  });

  //update
  router.put("/content/:id", (req, res) => {
    Content.findOne({ _id: req.params.id })
    .then(data => {
      let allowComments;
      if (req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }
     
       data.title = req.body.title;
        data.status = req.body.status;
        data.description = req.body.description;
        data.allowComments = allowComments;
        data
          .save()
          .then((data) => {
            res.redirect("/contents");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.delete('/delete/content/:id',(req,res) => {
    Content.remove({_id:req.params.id}) 
          .then(() => {
            res.redirect('/contents')
          })
          .catch(err => {
            console.log(err)
          })
})


router.post('/contents/comment/:id', (req,res) => {

  Content.findOne({ _id: req.params.id })
 .then(content => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.name,

    };
// console.log(req.body.commentBody)
    // add to comments array
content.comments.unshift(newComment);
content
      .save()
      .then((content) => {
        res.redirect("/read/PublicContent");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // content.save().then(content => {
  //     res.redirect(`/contents/${content.id}`);
  //     // res.send(content)
  //   });
  });

 

// router.get('/userContent',ensureAuthenticated,(req,res) => {
//     Content.find({userId:req.user._id})
//      .then(content => {
//          console.log(content)
//      })
// })
module.exports = router