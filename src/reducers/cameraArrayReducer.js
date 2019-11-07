var cameraArray = [];

const cameraArrayReducer = (state = cameraArray, action) => {
  switch (action.type) {
    case "PUSH_CAMERA_ARRAY":
      return action.payload;

    case "NULL_CAMERA_ARRAY":
      return action.payload;

    default:
      return state;
  }
};

export default cameraArrayReducer;
