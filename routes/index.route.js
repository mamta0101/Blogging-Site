const express = require("express");

const userRoutes = require("./user.route");
const blogRoutes = require("./blog.route");


const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
