export const changeAvatar = (uid, uri) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        avatar: uri.uri
      });
  };
};
