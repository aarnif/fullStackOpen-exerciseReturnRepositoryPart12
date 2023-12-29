import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateBlogContent,
  removeBlog,
  addNewComment,
} from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  Table,
  Tr,
  Th,
  Td,
  Button,
  CommentsBox,
  Ul,
  BlogComment,
  CommentForm,
  Input,
} from "../styles";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lisätty tämä if-ehto jälkikäteen mallivastauksen perusteella (muuten tulee error sivua uudelleen ladattaessa)
  if (!blog || !user) {
    return null;
  }

  const like = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = dispatch(updateBlogContent(blogToUpdate));
    dispatch(
      setNotification({
        message: `A like for the blog '${blog.title}' by '${blog.author}'`,
        type: "info",
      })
    );
  };

  const remove = async () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      const deletedBlog = dispatch(removeBlog(blog.id));
      dispatch(
        setNotification({
          message: `The blog' ${blog.title}' by '${blog.author} removed`,
          type: "info",
        })
      );
      navigate("/blogs");
    }
  };

  const comment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const addBlog = dispatch(addNewComment(blog.id, comment));
    dispatch(
      setNotification({
        message: `add comment '${comment}'`,
        type: "info",
      })
    );
    event.target.comment.value = "";
  };

  const canRemove = user && blog.user.username === user.username;

  return (
    <>
      <Table>
        <thead>
          <Tr>
            <Th>Title:</Th>
            <Th>
              {blog.title} {blog.author}
            </Th>
          </Tr>
        </thead>

        <tbody>
          <Tr>
            <Td>Url:</Td>
            <Td>
              <a href={blog.url}> {blog.url}</a>
            </Td>
          </Tr>

          <Tr>
            <Td>Likes:</Td>
            <Td>{blog.likes}</Td>
          </Tr>

          <Tr>
            <Td>Added by:</Td>
            <Td> {blog.user?.name}</Td>
          </Tr>
        </tbody>

        <tfoot>
          <Tr>
            <Td>Actions:</Td>
            <Td>
              <Button onClick={like}>like</Button>{" "}
              {canRemove && <Button onClick={remove}>delete</Button>}
            </Td>
          </Tr>
        </tfoot>
      </Table>
      <CommentsBox>
        <h3>Comments:</h3>

        <Ul>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment) => (
              <li key={comment.id}>
                <BlogComment>{comment.content}</BlogComment>
              </li>
            ))
          ) : (
            <li>
              <BlogComment>no comments yet</BlogComment>
            </li>
          )}
        </Ul>

        <CommentForm onSubmit={comment}>
          <Input
            type="text"
            id="comment"
            name="comment"
            placeholder="write your comment here..."
          ></Input>
          <Button type="submit">add comment</Button>
        </CommentForm>
      </CommentsBox>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;
