import * as api from "../api";
import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    console.log("shemovida");
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
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

// export const getPostsBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     console.log(searchQuery);
//     // dispatch({ type: START_LOADING });
//     // ბექიდან რო მოდის მონაცემები კიდე data-შია და ამიტო გვინდა ორჯერ გეკონსტრუქცია
//     const {
//       data: { data },
//     } = await api.fetchPostsBySearch(searchQuery);
//     console.log(data);
//     dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
//     dispatch({ type: END_LOADING });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
