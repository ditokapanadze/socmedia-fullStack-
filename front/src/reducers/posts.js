export default (posts = [], action) => {
  switch (action.type) {
    case "DELETE":
      // return console.log("test");
      return posts.filter((post) => post._id !== action.payload);
    // ორივეს ლოგიკა ერთი და იგივეა და ამიტო ვწერთ ესე
    case "LIKE_POST":
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};
