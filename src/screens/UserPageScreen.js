import React, { Component } from "react";
import window from "../constants/Layout";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import GridList from "react-native-grid-list";
import Menu, { MenuItem } from "react-native-material-menu";
import { addFollows } from "../actions/addFollowsAction";
import { changeAvatar } from "../actions/changeAvatarAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ShowMapBtn = ({ user, navigation }) => (
  <View style={styles.fRow}>
    <TouchableOpacity
      style={styles.fBlock}
      onPress={() =>
        navigation.navigate("FollowsScreen", { follows: user.follows })
      }
    >
      <Text>Follows</Text>
      <Text>{user.follows.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.fBlockCenter}
      onPress={() =>
        navigation.navigate("FollowersScreen", { followers: user.followers })
      }
    >
      <Text>Followers</Text>
      <Text>{user.followers.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.fBlock}
      onPress={() =>
        navigation.navigate("MapScreen", {
          id: user.id,
          mapName: user.firstName + " " + user.secondName + "'s map"
        })
      }
    >
      <Text>Map</Text>
    </TouchableOpacity>
  </View>
);

const ShowFollowBtn = ({ user, auth, addFollows, navigation }) => (
  <View style={styles.fRow}>
    <TouchableOpacity
      style={styles.fBlock}
      onPress={() =>
        navigation.navigate("FollowsScreen", { follows: user.follows })
      }
    >
      <Text>Follows</Text>
      <Text>{user.follows.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.fBlockCenter}
      onPress={() =>
        navigation.navigate("FollowersScreen", { followers: user.followers })
      }
    >
      <Text>Followers</Text>
      <Text>{user.followers.length}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.fBlock}
      onPress={() => addFollows(user.id, auth.uid)}
    >
      <Text>Follow</Text>
    </TouchableOpacity>
  </View>
);

class UserPageScreen extends Component {
  static navigationOptions = {
    header: null
  };

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

  renderNavBar = user => (
    <View style={styles.navContainer} key={user.id}>
      <View style={styles.statusBar} />
      <View style={styles.navBar} key={user.id}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="arrow-back" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight}>
          {user.id === this.props.auth.uid && (
            <Menu
              ref={this.setMenuRef}
              button={
                <Icon
                  name="toc"
                  size={25}
                  color="#fff"
                  onPress={this.showMenu}
                />
              }
            >
              <MenuItem
                onPress={event => {
                  this.props.navigation.navigate("CameraScreen", {
                    prevScreen: "UserPage"
                  });
                  this.hideMenu();
                }}
              >
                Upload photo from camera
              </MenuItem>
              <MenuItem
                onPress={event => {
                  this.props.navigation.navigate("GalleryScreen", {
                    prevScreen: "UserPage"
                  });
                  this.hideMenu();
                }}
              >
                Upload photo from gallery
              </MenuItem>
            </Menu>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  renderContent = (user, paramid, auth, props, addFollows) => {
    return (
      <View key={auth.uid}>
        {paramid === auth.uid && (
          <ShowMapBtn user={user} navigation={this.props.navigation} />
        )}
        {props.map(
          prop =>
            prop.id === auth.uid &&
            prop.follows.map(
              follow =>
                follow === paramid && (
                  <ShowMapBtn user={user} navigation={this.props.navigation} />
                )
            )
        )}
        {paramid !== auth.uid &&
          props.map(
            prop =>
              prop.id === auth.uid &&
              prop.follows.indexOf(paramid) === -1 && (
                <ShowFollowBtn
                  user={user}
                  auth={auth}
                  addFollows={addFollows}
                  navigation={this.props.navigation}
                />
              )
          )}
        <View style={{ marginTop: 7, marginBottom: 5 }}>
          <GridList
            showSeparator={true}
            separatorBorderWidth={0.5}
            data={user.photos}
            numColumns={2}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  };

  renderItem = ({ index, item }) => (
    <TouchableOpacity
      onLongPress={() => {
        this.props.changeAvatar(this.props.auth.uid, item.thumbnail);
      }}
    >
      <Image key={index} style={styles.image} source={item.thumbnail} />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.props.users &&
          this.props.users.map(
            user =>
              user.id === this.props.navigation.state.params.id && (
                <ReactNativeParallaxHeader
                  key={user.id}
                  headerMinHeight={window.window.height / 8}
                  headerMaxHeight={window.window.height / 2.5}
                  navbarColor="#8F52AD"
                  title={user.firstName + " " + user.secondName}
                  titleStyle={styles.titleStyle}
                  backgroundImage={{ uri: user.avatar }}
                  backgroundImageScale={1}
                  renderNavBar={this.renderNavBar.bind(this, user)}
                  renderContent={this.renderContent.bind(
                    this,
                    user,
                    this.props.navigation.state.params.id,
                    this.props.auth,
                    this.props.users,
                    this.props.addFollows
                  )}
                  containerStyle={styles.container}
                  contentContainerStyle={styles.contentContainer}
                  innerContainerStyle={styles.container}
                />
              )
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  contentContainer: {
    flexGrow: 1
  },
  statusBar: {
    height: 23
  },
  navContainer: {
    marginHorizontal: 10
  },
  navBar: {
    height: window.window.height / 8 - 23,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    color: "#fff",
    fontSize: 18
  },
  textt: {
    marginTop: 45
  },
  fRow: {
    flexDirection: "row",
    marginTop: 7,
    backgroundColor: "#FFF",
    paddingTop: 5,
    paddingBottom: 5
  },
  fBlock: {
    width: window.window.width / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  fBlockCenter: {
    width: window.window.width / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#8F52AD"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

function mapStateToProps(state) {
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addFollows,
      changeAvatar
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(UserPageScreen);
