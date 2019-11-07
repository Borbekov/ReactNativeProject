export const findFollows = name => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    var users = firestore.collection("users");
    var query = users.where("firstName", "==", name);
    let follows = [];
    query
      .get()
      .then(response => {
        response.docs.forEach(element => {
          follows.push(element.id);
        });
      })
      .then(() =>
        dispatch({
          type: "SEARCH_FOLLOWS",
          payload: follows
        })
      )
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
};

export const emptyFindFollows = () => {
  return {
    type: "EMPTY_SEARCH_FOLLOWS",
    payload: []
  };
};
