import { SET_POSTS } from "../actionTypes";

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
});

// action creaters / thunks
export const getPosts = () => {
  return async dispatch => {
    try {
      const posts = [
        { id: 1, content: "lorem" },
        { id: 2, content: "ipsum" },
        { id: 3, content: "dolor" }
      ];

      dispatch(setPosts(posts));
    } catch (err) {
      const error = err.response.data;
      console.log(error);
      // error handling
    }
  };
};
