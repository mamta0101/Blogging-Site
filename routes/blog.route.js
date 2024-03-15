const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { blogController } = require("../controllers/blog.controller");

const {
    createBlog,
    getAllBlogs,
    getBlogById, 
    updateBlog,
    deleteBlog 
    } =  blogController;

const router = express.Router();

router
.route('/')
.post(createBlog)
.get(getAllBlogs);

router
.route('/:blogId')
.get(getBlogById)
.patch(updateBlog)
.delete(deleteBlog);


module.exports=router;
