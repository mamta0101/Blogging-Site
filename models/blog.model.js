const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogTitle: String,
    category: String,
    shortDescription: String,
    longDescription: String,
    blogImage: String,
    readTime: Number,
    createdDate: String,
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
