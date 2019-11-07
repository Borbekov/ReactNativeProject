export const pushUriArray = (initArray, uri) => {
  console.log("INIT ", initArray);
  console.log("URIII ", uri);
  initArray.push({ url: uri });
  return {
    type: "PUSH_URI_ARRAY",
    payload: initArray
  };
};

export const nullUriArray = () => {
  return {
    type: "NULL_URI_ARRAY",
    payload: []
  };
};
