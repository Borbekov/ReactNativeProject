var uriArray = [];

const uriArrayReducer = (state = uriArray, action) => {
  switch (action.type) {
    case "PUSH_URI_ARRAY":
      return action.payload;

    case "NULL_URI_ARRAY":
      return action.payload;

    default:
      return state;
  }
};

export default uriArrayReducer;
