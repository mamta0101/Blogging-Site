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
.post(auth,createBlog)
.get(getAllBlogs);

router
.route('/:blogId')
.get(getBlogById)
.patch(auth,updateBlog)
.delete(auth,deleteBlog);


module.exports=router;
