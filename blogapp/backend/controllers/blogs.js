const router = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const { userExtractor } = require("../utils/middleware");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments");

  response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0,
  });

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  blog.user = user._id;

  let createdBlog = await blog.save();

  user.blogs = user.blogs.concat(createdBlog._id);
  await user.save();

  createdBlog = await Blog.findById(createdBlog._id)
    .populate("user")
    .populate("comments");

  response.status(201).json(createdBlog);
});

router.get("/:id", async (request, response) => {
  const findBlog = await Blog.findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments");

  response.json(findBlog);
});

router.put("/:id", async (request, response) => {
  const { title, url, author, likes, comments } = request.body;

  console.log(request.body);

  let updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, url, author, likes },
    { new: true }
  );

  console.log(updatedBlog);

  updatedBlog = await Blog.findById(updatedBlog._id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments");

  response.json(updatedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const user = request.user;

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "operation not permitted" });
  }

  user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

  await user.save();
  await blog.remove();

  response.status(204).end();
});

router.post("/:id/comments", async (request, response) => {
  console.log(request.body);

  const newComment = new Comment({ content: request.body.content });

  let saveComment = await newComment.save();

  const addCommentToBlog = await Blog.findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments");

  console.log(addCommentToBlog);
  console.log(addCommentToBlog.comments);

  addCommentToBlog.comments = addCommentToBlog.comments.concat(saveComment._id);
  await addCommentToBlog.save();

  response.json(addCommentToBlog);
});

module.exports = router;
