const initState = null;

const searchFollowsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH_FOLLOWS":
      return action.payload;
    case "EMPTY_SEARCH_FOLLOWS":
      return action.payload;
    default:
      return state;
  }
};

export default searchFollowsReducer;
