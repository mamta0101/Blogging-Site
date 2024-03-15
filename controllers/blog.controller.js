const Blog = require("../models/blog.model");

const blogController = {
  createBlog: async (req, res) => {
    try {
      const {
        author,
        blogTitle,
        category,
        shortDescription,
        longDescription,
        blogImage,
        readTime,
        createdDate,
        tags,
        isPublished,
      } = req.body;
      const blogExists = await Blog.findOne({ blogTitle: blogTitle });
      if (blogExists) {
        return res.status(302).json({
          message: "This blog already exists.",
        });
      }
      // if (req.user.role !== "admin") {
      //   return res.status(403).json({
      //     message: "You are not authorize to create Blog",
      //   });
      // }
      const newBlog = new Blog();
      newBlog.author = req.user.id;
      newBlog.blogTitle = blogTitle;
      newBlog.category = category;
      newBlog.shortDescription = shortDescription;
      newBlog.longDescription = longDescription;
      newBlog.blogImage = blogImage;
      newBlog.readTime = readTime;
      newBlog.createdDate = createdDate;
      newBlog.tags = tags;
      newBlog.isPublished = isPublished;
      await newBlog.save();

      res.status(201).json({
        status: "success",
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const { sort, sortColumn, sortBy, page, perPage, searchText } = req.query;
      const sorting = sort === "asc" ? sortColumn : `-${sortColumn}`;
      const pagination = perPage ? parseInt(perPage, 10) : 0;
      const pageNumber = page ? parseInt(page, 10) : 1;

      let query = {};
      if (searchText) {
        query = {
          $text: { $search: searchText },
        };
      }

      const totalCount = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .sort(sorting || sortBy)
        .skip(pagination * (pageNumber - 1))
        .limit(pagination);

      return res.status(200).json({
        message: "Blogs successfully retrieved",
        totalCount,
        blogs,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      res.status(200).json({
        status: "success",
        message: "Blog by ID successfully retrieved",
        data: blog,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (!blog)
        return res.status(404).json({
          message: "Blog not found by this Id",
        });
      // if (blog.author.toString() !== req.user.id) {
      //   return res.status(403).json({
      //     message: "You are not authorized to update this blog",
      //   });
      // } else if (req.user.role !== "admin") {
      //   return res.status(403).json({
      //     message: "You are not authorize to update this Blog",
      //   });
      // }
      const updatedblog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        req.body
      );

      res.status(200).json({
        status: "success",
        message: "Blog updated successfully",
        data: updatedblog,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (!blog)
        return res.status(404).json({
          message: "Blog not found by this Id",
        });
      // if (blog.author.toString() !== req.user.id) {
      //   return res.status(403).json({
      //     message: "You are not authorized to update this blog",
      //   });
      // } else if (req.user.role !== "admin") {
      //   return res.status(403).json({
      //     message: "You are not authorize to update this Blog",
      //   });
      // }
      await Blog.findByIdAndDelete(req.params.blogId);
      res.status(200).json({
        status: "success",
        message: "Blog deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
module.exports = { blogController };
