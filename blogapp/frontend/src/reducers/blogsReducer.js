import { createSlice } from "@reduxjs/toolkit";
import BlogService from "../services/blogs";

const initialState = [];

const notificationSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    appendBlog(state, action) {
      console.log(action.payload);
      return [...state, action.payload];
    },
    updateBlogs(state, action) {
      console.log(action.payload);
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog;
      });
    },
    deleteBlog(state, action) {
      const id = action.payload;
      console.log(id);
      return state.filter((blog) => {
        return blog.id !== id;
      });
    },
  },
});

const { setBlogs, appendBlog, updateBlogs, deleteBlog } =
  notificationSlice.actions;

export const inialitizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (newBlogContent) => {
  return async (dispatch) => {
    const newBlog = await BlogService.create(newBlogContent);
    dispatch(appendBlog(newBlog));
  };
};

export const updateBlogContent = (updatedBlogContent) => {
  return async (dispatch) => {
    const updatedBlog = await BlogService.update(updatedBlogContent);
    dispatch(updateBlogs(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await BlogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const addNewComment = (id, comment) => {
  return async (dispatch) => {
    const addToComments = await BlogService.addComment(id, {
      content: comment,
    });
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default notificationSlice.reducer;
