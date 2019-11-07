export const addFollows = (id, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        follows: firebase.firestore.FieldValue.arrayUnion(id)
      })
      .then(() =>
        firestore
          .collection("users")
          .doc(id)
          .update({
            followers: firebase.firestore.FieldValue.arrayUnion(uid)
          })
      );
  };
};
