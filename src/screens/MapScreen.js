import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Menu, { MenuItem } from "react-native-material-menu";
import window from "../constants/Layout";
import { putInitialCoordinates } from "../actions/initialCoordinatesAction";
import { nullCameraArray } from "../actions/cameraArrayAction";
import { pushUriArray } from "../actions/uriArrayAction";
import { addMarker } from "../actions/addMarkerAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "../constants/firebaseConfig";
const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.mapName,
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  state = {
    region: this.props.initialCoordinates,
    showInputs: false,
    title: "",
    description: "",
    coordinate: {},
    photoToSend: [],
    photo: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.navigation.state.params.image !==
      prevProps.navigation.state.params.image
    ) {
      this.setState({
        photo: this.props.navigation.state.params.image
      });
    }
    if (
      this.state.photoToSend.length > 0 &&
      this.state.photoToSend !== prevState.photoToSend
    ) {
      this.props.addMarker(
        this.props.auth.uid,
        this.state.title,
        this.state.description,
        this.state.coordinate,
        this.state.photoToSend
      );
    }
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = event => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  uploadImage = async img => {
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
      .child(this.props.navigation.state.params.id + "/" + img);
    const snapshot = await ref.put(blob);
    const remoteUri = await snapshot.ref.getDownloadURL();
    this.setState({
      photoToSend: remoteUri
    });
    blob.close();
    return remoteUri;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.navigation.state.params.newsTitle && (
          <MapView
            style={styles.container}
            initialRegion={this.state.region}
            showsUserLocation={true}
          >
            <Marker
              key={this.props.navigation.state.params.coordinates.longitude}
              coordinate={this.props.navigation.state.params.coordinates}
              pinColor={"#8F52AD"}
            >
              <Callout>
                <Text>{this.props.navigation.state.params.newsTitle}</Text>
              </Callout>
            </Marker>
            {this.props.navigation.state.params.coordinates && (
              <MapViewDirections
                origin={this.state.region}
                destination={this.props.navigation.state.params.coordinates}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor={"#8F52AD"}
              />
            )}
          </MapView>
        )}

        {this.props.navigation.state.params.id &&
          (this.props.navigation.state.params.id === this.props.auth.uid ? (
            <MapView
              style={styles.container}
              initialRegion={this.state.region}
              showsUserLocation={true}
              onLongPress={data => {
                this.setState({
                  showInputs: true,
                  coordinate: data.nativeEvent.coordinate,
                  photo: null,
                  photoToSend: [],
                  title: "",
                  description: ""
                });
              }}
            >
              {this.props.users.map(
                user =>
                  user.id === this.props.navigation.state.params.id &&
                  user.places.map(place => (
                    <Marker
                      key={place.coordinates.latitude}
                      coordinate={place.coordinates}
                      pinColor={"#8F52AD"}
                    >
                      <Callout
                        onPress={() =>
                          this.props.navigation.navigate("PlaceFullScreen", {
                            type: "",
                            title: place.title,
                            description: place.description,
                            coordinates: place.coordinates,
                            photos: [{ url: place.photo }]
                          })
                        }
                      >
                        <Text>{place.title}</Text>
                      </Callout>
                    </Marker>
                  ))
              )}
              {this.props.navigation.state.params.coordinates && (
                <MapViewDirections
                  origin={this.state.region}
                  destination={this.props.navigation.state.params.coordinates}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor={"#8F52AD"}
                />
              )}
            </MapView>
          ) : (
            <MapView
              style={styles.container}
              initialRegion={this.state.region}
              showsUserLocation={true}
            >
              {this.props.users.map(
                user =>
                  user.id === this.props.navigation.state.params.id &&
                  user.places.map(place => (
                    <Marker
                      key={place.coordinates.latitude}
                      coordinate={place.coordinates}
                      pinColor={"#8F52AD"}
                    >
                      <Callout
                        onPress={() =>
                          this.props.navigation.navigate("PlaceFullScreen", {
                            type: "",
                            title: place.title,
                            description: place.description,
                            coordinates: place.coordinates,
                            photos: [{ url: place.photo }]
                          })
                        }
                      >
                        <Text>{place.title}</Text>
                      </Callout>
                    </Marker>
                  ))
              )}
              {this.props.navigation.state.params.coordinates && (
                <MapViewDirections
                  origin={this.state.region}
                  destination={this.props.navigation.state.params.coordinates}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor={"#8F52AD"}
                />
              )}
            </MapView>
          ))}
        {this.state.showInputs === true && (
          <View style={styles.showInputs}>
            <Text style={styles.title}>Title</Text>
            <TextInput
              style={styles.textInputTitle}
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.textInputDescriptiom}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              editable={true}
              multiline={true}
              numberOfLines={5}
            />
            {this.state.photo === null ? (
              <Menu
                ref={this.setMenuRef}
                button={<Text onPress={this.showMenu}>Upload photo</Text>}
              >
                <MenuItem
                  onPress={event => {
                    this.props.navigation.navigate("CameraScreen", {
                      prevScreen: "MapScreen"
                    });
                    this.hideMenu(event);
                  }}
                >
                  Upload from camera
                </MenuItem>
                <MenuItem
                  onPress={event => {
                    this.props.navigation.navigate("GalleryScreen", {
                      prevScreen: "MapScreen"
                    });
                    this.hideMenu(event);
                  }}
                >
                  Upload from gallery
                </MenuItem>
              </Menu>
            ) : (
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: this.state.photo }}
              />
            )}
            <Text
              style={{ marginTop: 10 }}
              onPress={() => {
                this.uploadImage(this.state.photo);
                this.props.nullCameraArray();
                this.setState({
                  showInputs: false
                });
              }}
            >
              Save
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  carouselStyle: {
    padding: 25
  },
  endPadding: {
    paddingRight: window.window.width - window.window.height - 50
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "rgba(244,255,244, 1)",
    marginHorizontal: 10,
    margin: 30,
    shadowColor: "rgba(0,72,51, 0.9)",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    height: window.window.height / 4,
    width: window.window.height - 50
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,153,102, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,153,102, 0.5)",
    position: "absolute",
    borderWidth: 0.5,
    borderColor: "rgba(0,153,102, 0.5)"
  },
  showInputs: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#FFF",
    height: window.window.height - 200,
    width: window.window.width - 100,
    borderWidth: 0.5,
    borderColor: "#8F52AD",
    marginLeft: 50,
    marginTop: 50
  },
  title: {
    fontSize: 12,
    marginTop: 5
  },
  textInputTitle: {
    borderWidth: 1,
    borderColor: "#8F52AD",
    height: 40,
    width: window.window.width - 100 - 20,
    marginTop: 5,
    marginBottom: 10
  },
  textInputDescriptiom: {
    borderWidth: 1,
    borderColor: "#8F52AD",
    width: window.window.width - 100 - 20,
    marginTop: 5,
    marginBottom: 10
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

function mapStateToProps(state) {
  return {
    initialCoordinates: state.initialCoordinates,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    cameraArrayReducer: state.cameraArrayReducer,
    uriArray: state.uriArray
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      putInitialCoordinates,
      addMarker,
      nullCameraArray,
      pushUriArray
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "cityMap" }, { collection: "users" }])
)(MapScreen);
