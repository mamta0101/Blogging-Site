const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);



module.exports= mongoose.model("User", UserSchema);
