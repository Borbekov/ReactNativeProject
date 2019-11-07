import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { findFollows, emptyFindFollows } from "../actions/findFollowsAction";
import { addFollows } from "../actions/addFollowsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class SearchFriendsScreen extends React.Component {
  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = {
    name: ""
  };

  componentDidMount() {
    this.props.emptyFindFollows();
  }

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.state;
    if (name.length > 0) {
      if (name !== prevState.name) {
        this.props.findFollows(name.trim());
      }
    }
  }

  render() {
    let list = [];
    if (this.props.searchFollowsReducer) {
      this.props.searchFollowsReducer.map(id => {
        list.push(id);
      });
    }
    return (
      <ScrollView style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            clearButtonMode="always"
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.list}>
          {this.props.users.map(user =>
            list.map(
              id =>
                user.id === id &&
                (this.props.profile.follows.indexOf(user.id) === -1 ? (
                  <ListItem
                    key={user.id}
                    containerStyle={styles.listItem}
                    title={user.firstName + " " + user.secondName}
                    titleStyle={styles.listText}
                    avatar={{ uri: user.avatar }}
                    roundAvatar
                    avatarContainerStyle={styles.avatarContainerStyle}
                    avatarStyle={styles.avatarStyle}
                    rightIcon=<Icon
                      name="person-add"
                      size={25}
                      style={{ marginRight: 5, color: "#8F52AD" }}
                      onPress={() =>
                        this.props.addFollows(user.id, this.props.auth.uid)
                      }
                    />
                    onPress={() =>
                      this.props.navigation.navigate("UserPageScreen", {
                        id: user.id
                      })
                    }
                  />
                ) : (
                  <ListItem
                    key={user.id}
                    containerStyle={styles.listItem}
                    title={user.firstName + " " + user.secondName}
                    titleStyle={styles.listText}
                    avatar={{ uri: user.avatar }}
                    roundAvatar
                    avatarContainerStyle={styles.avatarContainerStyle}
                    avatarStyle={styles.avatarStyle}
                    rightIcon=<Icon
                      name="check"
                      size={25}
                      style={{ marginRight: 5, color: "#8F52AD" }}
                    />
                    onPress={() =>
                      this.props.navigation.navigate("UserPageScreen", {
                        id: user.id
                      })
                    }
                  />
                ))
            )
          )}
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
  textInput: {
    height: 40,
    borderColor: "#8F52AD",
    borderWidth: 1,
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: "#fff"
  },
  list: {
    marginTop: 7,
    backgroundColor: "#FFF"
  },
  listItem: {
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 0
  },
  listText: {
    flex: 7,
    fontSize: 18,
    marginLeft: 15
  },
  avatarContainerStyle: {
    width: 50,
    height: 50,
    marginLeft: 5
  },
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
});

function mapStateToProps(state) {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    searchFollowsReducer: state.searchFollowsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      findFollows,
      emptyFindFollows,
      addFollows
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
)(SearchFriendsScreen);
