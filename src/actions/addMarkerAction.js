export const addMarker = (uid, title, description, coordinates, photo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        places: firebase.firestore.FieldValue.arrayUnion({
          coordinates,
          photo,
          title,
          description
        })
      });
  };
};

export const removeMarker = (uid, coordinates) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(uid)
      .update({
        places: firebase.firestore.FieldValue.arrayRemove({ coordinates })
      });
  };
};
