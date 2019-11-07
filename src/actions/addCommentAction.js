export const addCommentNews = (newsId, firstName, secondName, id, text) => {
  if (text.length > 0) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      firestore
        .collection("news")
        .doc(newsId)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            firstName,
            id,
            secondName,
            text
          })
        });
    };
  }
};

//Place
export const addCommentPlace = (placeId, firstName, secondName, id, text) => {
  if (text.length > 0) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      firestore
        .collection("cityMap")
        .doc(placeId)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            firstName,
            id,
            secondName,
            text
          })
        });
    };
  }
};
