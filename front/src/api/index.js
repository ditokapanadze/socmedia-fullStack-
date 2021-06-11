import axios from "axios";
const API = axios.create({ baseURL: "https://socmedia444.herokuapp.com/" });

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// ცალ ცალკე ყველა რექვესთ რო არ მივცეთ ტოკენი, ესე შეიძლება ყველას გავაყოლოთ
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
