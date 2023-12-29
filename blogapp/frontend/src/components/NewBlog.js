import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form, LoginHeader, Ul, Li, Label, Input, Button } from "../styles";
import Togglable from "./Togglable";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlogContent = { title, author, url };
    const addNewBlog = dispatch(addBlog(newBlogContent));
    dispatch(
      setNotification({
        message: `A new blog '${newBlogContent.title}' by '${newBlogContent.author}' added`,
        type: "info",
      })
    );
    handleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleVisibility = () => blogFormRef.current.toggleVisibility();

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <Form onSubmit={handleSubmit}>
        <LoginHeader>Create a new blog</LoginHeader>
        <Ul>
          <Li>
            <Label>title</Label>
          </Li>
          <Li>
            <Input
              id="title"
              placeholder="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Li>
        </Ul>
        <Ul>
          <Li>
            <Label>author</Label>
          </Li>
          <Li>
            <Input
              id="author"
              placeholder="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Li>
        </Ul>
        <Ul>
          <Li>
            <Label>url</Label>
          </Li>
          <Li>
            <Input
              id="url"
              placeholder="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Li>
        </Ul>
        <Li>
          <Button type="button" onClick={handleVisibility}>
            cancel
          </Button>
          <Button type="submit">create</Button>
        </Li>
      </Form>
    </Togglable>
  );
};

export default BlogForm;
