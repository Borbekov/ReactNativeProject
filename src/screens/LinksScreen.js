import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: this.props.initialCoordinates
  };

  render() {
    console.log(this.props.places);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={this.state.region}
          showsUserLocation={true}
        >
          {this.props.places &&
            this.props.places.map(place => (
              <Marker
                coordinate={place.coordinates}
                pinColor={"#8F52AD"}
                key={place.id}
              >
                <Callout
                  onPress={() =>
                    this.props.navigation.navigate("PlaceFullScreen", {
                      type: place.type,
                      title: place.title,
                      description: place.description,
                      coordinates: place.coordinates,
                      photos: place.photos,
                      placeId: place.id
                    })
                  }
                >
                  <Text>{place.title}</Text>
                </Callout>
              </Marker>
            ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    places: state.firestore.ordered.cityMap,
    initialCoordinates: state.initialCoordinates
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "cityMap" }])
)(LinksScreen);
