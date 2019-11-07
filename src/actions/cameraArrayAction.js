export const pushCameraArray = (initArray, key) => {
  initArray.push({ key });
  return {
    type: "PUSH_CAMERA_ARRAY",
    payload: initArray
  };
};

export const nullCameraArray = () => {
  return {
    type: "NULL_CAMERA_ARRAY",
    payload: []
  };
};
