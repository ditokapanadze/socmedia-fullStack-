import * as api from "../api";
import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  console.log("like");
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      // ბექიდან რო მოდის მონაცემები კიდე data-შია და ამიტო გვინდა ორჯერ გეკონსტრუქცია
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
