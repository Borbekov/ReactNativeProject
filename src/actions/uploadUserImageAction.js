export const uploadUserImage = (uri, uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        photos: firebase.firestore.FieldValue.arrayUnion({
          thumbnail: { uri }
        })
      });
  };
};
