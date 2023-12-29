const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("./utils/config");
const logger = require("./utils/logger");
const Blog = require("./models/blog");
const User = require("./models/user");
const Comment = require("./models/comment");
const { blogs, users } = require("./sampleData");

const emptyDataBase = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Comment.deleteMany({});
};

const addUsers = async () => {
  for (let i = 0; i < users.length; ++i) {
    const { _id, username, password, name } = users[i];
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: _id,
      username: username,
      name: name,
      passwordHash: passwordHash,
    });
    // Divide blogs between two users
    if (i === 0) {
      newUser.blogs = [blogs[0], blogs[1], blogs[2]];
    } else {
      newUser.blogs = [blogs[3], blogs[4]];
    }
    await newUser.save();
  }
};

const addBlogs = async () => {
  for (let i = 0; i < blogs.length; ++i) {
    const newBlog = new Blog(blogs[i]);
    newBlog.user = users[0];
    await newBlog.save();
  }
};

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

const main = async () => {
  await emptyDataBase();
  await addUsers();
  await addBlogs();
  logger.info("disconnect from MongoDB");
  mongoose.connection.close();
};

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
    main();
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
