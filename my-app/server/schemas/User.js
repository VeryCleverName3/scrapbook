const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  profilePicUrl: String,
  posts: [
    {
      text: {
        includedUsers: String,
        content: String,
        title: String,
        location: String,
        userCookie: String,
        time: Number,
      },
      photos: [
        {
          fieldname: String,
          originalname: String,
          encoding: String,
          mimetype: String,
          destination: String,
          filename: String,
          path: String,
          size: Number,
          url: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
