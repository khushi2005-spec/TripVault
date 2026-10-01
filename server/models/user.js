// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 2,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim:true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// },
// {
//     timestamps: true,
// }
// );
// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);
module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);