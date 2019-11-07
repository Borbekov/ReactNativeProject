import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Alert
} from "react-native";
import { Card } from "react-native-elements";
import { MonoText } from "../components/StyledText";
import Icon from "react-native-vector-icons/AntDesign";
import { putInitialCoordinates } from "../actions/initialCoordinatesAction";
import { putLikeNews, deleteLikeNews } from "../actions/putLikeAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "News",
    headerStyle: {
      backgroundColor: "#8F52AD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.putInitialCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true }
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.news &&
          this.props.news.map(news => (
            <Card
              key={news.id}
              image={{ uri: news.photo }}
              containerStyle={styles.card}
            >
              <Text style={styles.title}>{news.title}</Text>
              <Text style={styles.description}>{news.shortDescription}</Text>
              <View style={styles.likeBlock1}>
                <View style={styles.likeBlock2}>
                  {news.likes.length > 0 ? (
                    news.likes.indexOf(this.props.auth.uid) === -1 ? (
                      <Icon
                        name="like2"
                        size={30}
                        style={styles.like1}
                        onPress={() =>
                          this.props.putLikeNews(news.id, this.props.auth.uid)
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
                        this.props.putLikeNews(news.id, this.props.auth.uid)
                      }
                    />
                  )}
                  <Text style={styles.likeAmount}>{news.likes.length}</Text>
                </View>
                <View>
                  <Text
                    style={styles.detail}
                    onPress={() =>
                      this.props.navigation.navigate("PlaceFullScreen", {
                        type: news.type,
                        title: news.title,
                        description: news.description,
                        coordinates: news.coordinates,
                        newsId: news.id,
                        photos: news.photos
                      })
                    }
                  >
                    Detail
                  </Text>
                </View>
              </View>
            </Card>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  card: {
    backgroundColor: "#fff",
    padding: 5,
    margin: 0,
    marginBottom: 10,
    borderWidth: 0,
    borderWidth: 0.5,
    borderColor: "#8F52AD"
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  description: {
    marginBottom: 10,
    fontSize: 14
  },

  likeBlock1: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  detail: {
    color: "#8F52AD",
    paddingTop: 15,
    paddingRight: 10,
    fontSize: 16
  }
});

function mapStateToProps(state, ownProps) {
  return {
    news: state.firestore.ordered.news,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      putInitialCoordinates,
      putLikeNews,
      deleteLikeNews
    },
    dispatch
  );
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "news" }, { collection: "users" }])
)(HomeScreen);
