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
import { MonoText } from "../components/StyledText";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { YellowBox } from "react-native";

class FriendsListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Follows",
    headerRight: (
      <Icon
        name="person-add"
        size={25}
        style={{ marginRight: 15, color: "#fff" }}
        onPress={() => navigation.navigate("SearchFriendsScreen")}
      />
    ),
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {!this.props.navigation.state.params &&
            this.props.profile.follows.map(follow =>
              this.props.users.map(
                user =>
                  follow === user.id && (
                    <ListItem
                      key={user.id}
                      containerStyle={styles.listItem}
                      title={user.firstName + " " + user.secondName}
                      titleStyle={styles.listText}
                      avatar={{ uri: user.avatar }}
                      roundAvatar
                      avatarContainerStyle={styles.avatarContainerStyle}
                      avatarStyle={styles.avatarStyle}
                      onPress={() =>
                        this.props.navigation.navigate("UserPageScreen", {
                          id: user.id
                        })
                      }
                    />
                  )
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
  list: {
    marginTop: 7,
    backgroundColor: "#FFFFFF"
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
    users: state.firestore.ordered.users
  };
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(FriendsListScreen);
