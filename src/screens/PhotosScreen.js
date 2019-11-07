import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import GridList from "react-native-grid-list";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class PhotosScreen extends Component {
  static navigationOptions = {
    title: "Almaty",
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  renderItem = ({ index, item }) => (
    <Image key={index} style={styles.image} source={item.thumbnail} />
  );

  render() {
    return (
      <ScrollView>
        {this.props.cityPhotos &&
          this.props.cityPhotos.map(cp => (
            <GridList
              key={cp.id}
              showSeparator={true}
              separatorBorderWidth={0.5}
              data={cp.cityPhotos}
              numColumns={2}
              renderItem={this.renderItem}
            />
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%"
  }
});

function mapStateToProps(state) {
  return {
    cityPhotos: state.firestore.ordered.cityPhotos
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "cityPhotos" }])
)(PhotosScreen);
