import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import userData from "./userDataReducer";
import initialCoordinates from "./initialCoordinatesReducer";
import searchFollowsReducer from "./searchFollowsReducer";
import cameraArrayReducer from "./cameraArrayReducer";
import uriArrayReducer from "./uriArrayReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userData: userData,
  initialCoordinates: initialCoordinates,
  searchFollowsReducer: searchFollowsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  cameraArrayReducer: cameraArrayReducer,
  uriArray: uriArrayReducer
});

export default rootReducer;
