import React from "react";
import MonoText from "../components/StyledText";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Avatar, ListItem, Icon } from "react-native-elements";
import { signOut } from "../actions/authAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Handling",
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentDidUpdate(prevProps) {
    if (!this.props.auth.uid) {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.list}>
            <ListItem
              key={1}
              containerStyle={styles.listItem}
              title={
                this.props.profile.firstName +
                " " +
                this.props.profile.secondName
              }
              titleStyle={styles.listText}
              avatar={{ uri: this.props.profile.avatar }}
              roundAvatar
              avatarContainerStyle={styles.avatarContainerStyle}
              avatarStyle={styles.avatarStyle}
              onPress={() =>
                this.props.navigation.navigate("UserPageScreen", {
                  id: this.props.auth.uid
                })
              }
            />
          </View>
          <View style={styles.list}>
            <ListItem
              key={2}
              containerStyle={styles.listItem}
              title="Follows"
              titleStyle={styles.listText}
              leftIcon={
                <Icon
                  name="users"
                  type="feather"
                  color="#8F52AD"
                  iconStyle={styles.icon}
                />
              }
              onPress={() =>
                this.props.navigation.navigate("FriendsListScreen")
              }
            />
            <ListItem
              key={3}
              containerStyle={styles.listItem}
              title="Photos"
              titleStyle={styles.listText}
              leftIcon={
                <Icon
                  name="camera"
                  type="feather"
                  color="#8F52AD"
                  iconStyle={styles.icon}
                />
              }
              onPress={() => this.props.navigation.navigate("PhotosScreen")}
            />
          </View>
          <View style={styles.list}>
            <ListItem
              key={6}
              containerStyle={styles.listItem}
              title="Log out"
              titleStyle={styles.listText}
              leftIcon={
                <Icon
                  name="log-out"
                  type="feather"
                  color="#8F52AD"
                  iconStyle={styles.icon}
                />
              }
              onPress={() => this.props.signOut()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  list: {
    marginTop: 7,
    backgroundColor: "#FFFFFF"
  },
  listItem: {
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 0
  },
  icon: {
    paddingRight: 13
  },
  listText: {
    flex: 7,
    fontSize: 18
  },
  avatarContainerStyle: {
    width: 50,
    height: 50,
    marginLeft: 5,
    marginRight: 5
  },
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
});

function mapStateToProps(state) {
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    places: state.firestore.ordered.cityMap
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signOut
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "cityMap" }])
)(SettingsScreen);
