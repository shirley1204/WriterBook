const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = Schema({
  userId: {
    type:String,
    required:true
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'UserModel',
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "public",
    // required: true,
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  
  comments: [{
    commentBody: {
      type: String,
      
    },
  
    commentUser: {
      type: String,
      
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
  }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Content = mongoose.model("Content", ContentSchema);
