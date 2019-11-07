import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import Slideshow from "react-native-image-slider-show";
import Icon from "react-native-vector-icons/AntDesign";
import window from "../constants/Layout";
import { bindActionCreators } from "redux";
import {
  putLikeNews,
  deleteLikeNews,
  putLikePlace,
  deleteLikePlace
} from "../actions/putLikeAction";
import { addCommentNews, addCommentPlace } from "../actions/addCommentAction";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class PlaceFullScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.type,
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });

  state = {
    open: false,
    text: ""
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={85}
        enabled
        style={styles.container}
      >
        <ScrollView>
          <Slideshow
            key={this.props.navigation.state.params.photos}
            scrollEnabled={false}
            dataSource={this.props.navigation.state.params.photos}
          />
          <View style={styles.card}>
            <Text style={styles.title}>
              {this.props.navigation.state.params.title}
            </Text>
            <Text style={styles.description}>
              {this.props.navigation.state.params.description}
            </Text>
            {this.props.navigation.state.params.newsId &&
              this.props.news.map(
                news =>
                  news.id === this.props.navigation.state.params.newsId && (
                    <View>
                      <View style={styles.likeBlock1}>
                        <View style={styles.likeBlock2}>
                          {news.likes.length > 0 ? (
                            news.likes.indexOf(this.props.auth.uid) === -1 ? (
                              <Icon
                                name="like2"
                                size={30}
                                style={styles.like1}
                                onPress={() =>
                                  this.props.putLikeNews(
                                    news.id,
                                    this.props.auth.uid
                                  )
                                }
                              />
                            ) : (
                              <Icon
                                name="like1"
                                size={30}
                                style={styles.like2}
                                onPress={() =>
                                  this.props.deleteLikeNews(
                                    news.id,
                                    this.props.auth.uid
                                  )
                                }
                              />
                            )
                          ) : (
                            <Icon
                              name="like2"
                              size={30}
                              style={styles.like1}
                              onPress={() =>
                                this.props.putLikeNews(
                                  news.id,
                                  this.props.auth.uid
                                )
                              }
                            />
                          )}
                          <Text style={styles.likeAmount}>
                            {news.likes.length}
                          </Text>
                          <Icon
                            name="message1"
                            size={30}
                            style={styles.comment1}
                            onPress={() => this.setState({ open: true })}
                          />
                          <Text style={styles.likeAmount}>
                            {news.comments.length}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={styles.directionBtn}
                            onPress={() =>
                              this.props.navigation.navigate("MapScreen", {
                                coordinates: this.props.navigation.state.params
                                  .coordinates,
                                newsTitle: this.props.navigation.state.params
                                  .title
                              })
                            }
                          >
                            Show direction
                          </Text>
                        </View>
                      </View>
                      {this.state.open === true && (
                        <View>
                          {news.comments.map(comment => (
                            <View style={styles.commentBlock}>
                              <Text
                                style={styles.commentOwner}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    "UserPageScreen",
                                    {
                                      id: comment.id
                                    }
                                  )
                                }
                              >
                                {comment.firstName} {comment.secondName}
                              </Text>
                              <Text style={styles.commentText}>
                                {comment.text}
                              </Text>
                            </View>
                          ))}
                          <View>
                            <TextInput
                              value={this.state.text}
                              style={styles.textInput}
                              clearButtonMode="always"
                              onChangeText={text => this.setState({ text })}
                            />
                            <TouchableOpacity
                              style={styles.send}
                              onPress={() => {
                                this.props.addCommentNews(
                                  news.id,
                                  this.props.profile.firstName,
                                  this.props.profile.secondName,
                                  this.props.auth.uid,
                                  this.state.text
                                );
                                this.setState({ text: "" });
                              }}
                            >
                              <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  )
              )}

            {this.props.navigation.state.params.placeId &&
              this.props.places.map(
                place =>
                  place.id === this.props.navigation.state.params.placeId && (
                    <View>
                      <View style={styles.likeBlock1}>
                        <View style={styles.likeBlock2}>
                          {place.likes.length > 0 ? (
                            place.likes.indexOf(this.props.auth.uid) === -1 ? (
                              <Icon
                                name="like2"
                                size={30}
                                style={styles.like1}
                                onPress={() =>
                                  this.props.putLikePlace(
                                    place.id,
                                    this.props.auth.uid
                                  )
                                }
                              />
                            ) : (
                              <Icon
                                name="like1"
                                size={30}
                                style={styles.like2}
                                onPress={() =>
                                  this.props.deleteLikePlace(
                                    place.id,
                                    this.props.auth.uid
                                  )
                                }
                              />
                            )
                          ) : (
                            <Icon
                              name="like2"
                              size={30}
                              style={styles.like1}
                              onPress={() =>
                                this.props.putLikePlace(
                                  place.id,
                                  this.props.auth.uid
                                )
                              }
                            />
                          )}
                          <Text style={styles.likeAmount}>
                            {place.likes.length}
                          </Text>
                          <Icon
                            name="message1"
                            size={30}
                            style={styles.comment1}
                            onPress={() => this.setState({ open: true })}
                          />
                          <Text style={styles.likeAmount}>
                            {place.comments.length}
                          </Text>
                        </View>
                      </View>
                      {this.state.open === true && (
                        <View>
                          {place.comments.map(comment => (
                            <View style={styles.commentBlock} key={comment.id}>
                              <Text
                                style={styles.commentOwner}
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    "UserPageScreen",
                                    {
                                      id: comment.id
                                    }
                                  )
                                }
                              >
                                {comment.firstName} {comment.secondName}
                              </Text>
                              <Text style={styles.commentText}>
                                {comment.text}
                              </Text>
                            </View>
                          ))}
                          <View>
                            <TextInput
                              value={this.state.text}
                              style={styles.textInput}
                              clearButtonMode="always"
                              onChangeText={text => this.setState({ text })}
                            />
                            <TouchableOpacity
                              style={styles.send}
                              onPress={() => {
                                this.props.addCommentPlace(
                                  place.id,
                                  this.props.profile.firstName,
                                  this.props.profile.secondName,
                                  this.props.auth.uid,
                                  this.state.text
                                );
                                this.setState({ text: "" });
                              }}
                            >
                              <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  )
              )}
            {this.props.navigation.state.params.type.length === 0 && (
              <View>
                <View style={styles.likeBlock1}>
                  <View>
                    <Text
                      style={styles.directionBtn}
                      onPress={() =>
                        this.props.navigation.navigate("MapScreen", {
                          coordinates: this.props.navigation.state.params
                            .coordinates
                        })
                      }
                    >
                      Show direction
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  description: {
    marginTop: 5,
    fontSize: 18
  },
  directionBtn: {
    color: "#8F52AD",
    marginTop: 15,
    fontSize: 16
  },
  likeBlock1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10
  },
  likeBlock2: {
    flexDirection: "row"
  },
  likeAmount: {
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: "center",
    paddingTop: 15
  },
  like1: {
    color: "grey",
    marginTop: 7
  },
  like2: {
    color: "#8F52AD",
    marginTop: 7
  },
  comment1: {
    color: "#8F52AD",
    marginTop: 7,
    marginLeft: 10
  },
  commentBlock: {
    marginTop: 15
  },
  commentOwner: {
    fontSize: 16,
    fontWeight: "bold"
  },
  commentText: {
    fontSize: 14,
    paddingLeft: 7,
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderColor: "#8F52AD",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 5
  },
  keyboard: {
    flex: 1,
    justifyContent: "center"
  },
  send: {
    backgroundColor: "#8F52AD",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7,
    width: window.window.width / 4,
    marginLeft: window.window.width - window.window.width / 4 - 20,
    borderRadius: 3,
    marginBottom: 7
  },
  sendText: {
    color: "#FFF",
    fontSize: 14
  }
});

function mapStateToProps(state, ownProps) {
  return {
    news: state.firestore.ordered.news,
    places: state.firestore.ordered.cityMap,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      putLikeNews,
      deleteLikeNews,
      putLikePlace,
      deleteLikePlace,
      addCommentNews,
      addCommentPlace
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "news" },
    { collection: "users" },
    { collection: "cityMap" }
  ])
)(PlaceFullScreen);
