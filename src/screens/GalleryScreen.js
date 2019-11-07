import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { pushCameraArray } from "../actions/cameraArrayAction";
import { uploadUserImage } from "../actions/uploadUserImageAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "redux";
import firebase from "../constants/firebaseConfig";

class GalleryScreen extends Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync();

    if (this.props.navigation.state.params.prevScreen === "MapScreen") {
      if (!result.cancelled) {
        //  this.props.pushCameraArray(this.props.cameraArrayReducer, result.uri);
        this.props.navigation.navigate("MapScreen", {
          image: result.uri
        });
      }
    }

    if (this.props.navigation.state.params.prevScreen === "UserPage") {
      if (!result.cancelled) {
        //  this.props.pushCameraArray(this.props.cameraArrayReducer, result.uri);
        this.uploadImage(result.uri, this.props.auth.uid);
        this.props.navigation.goBack();
      }
    }
  }

  uploadImage = async (img, uid) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", img, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(uid + "/" + img);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();
    this.props.uploadUserImage(remoteUri, uid);
    blob.close();
    return remoteUri;
  };

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#8F52AD" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    cameraArrayReducer: state.cameraArrayReducer,
    auth: state.firebase.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      pushCameraArray,
      uploadUserImage
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GalleryScreen);
