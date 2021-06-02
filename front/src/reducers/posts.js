import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  FETCH_BY_SEARCH,
  LIKE,
} from "../constants/actionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      // return console.log("test");
      return posts.filter((post) => post._id !== action.payload);
    // ორივეს ლოგიკა ერთი და იგივეა და ამიტო ვწერთ ესე
    case LIKE:
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case FETCH_BY_SEARCH:
      return action.payload;
    default:
      return posts;
  }
};
