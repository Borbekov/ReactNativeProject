export const putLikeNews = (id, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("news")
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid)
      });
  };
};

export const deleteLikeNews = (id, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("news")
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(uid)
      });
  };
};

//Place
export const putLikePlace = (id, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("cityMap")
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid)
      });
  };
};

export const deleteLikePlace = (id, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("cityMap")
      .doc(id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(uid)
      });
  };
};
