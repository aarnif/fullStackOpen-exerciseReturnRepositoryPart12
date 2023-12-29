import { Link } from "react-router-dom";
import NewBlog from "./NewBlog";
import { Container, Card, BlogTitle } from "../styles";

const Blogs = ({ blogs }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <>
      <Container>
        {blogs.sort(byLikes).map((blog) => (
          <Card key={blog.id}>
            <BlogTitle id="title">
              <Link id="link" to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </BlogTitle>
            <h3>by {blog.author}</h3>
          </Card>
        ))}
      </Container>
      <NewBlog />
    </>
  );
};

export default Blogs;
