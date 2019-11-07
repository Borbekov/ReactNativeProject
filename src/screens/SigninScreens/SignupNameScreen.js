import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/Entypo";
import { Fumi } from "react-native-textinput-effects";
import window from "../../constants/Layout";
import DatePicker from "react-native-datepicker";
import { changeUserName } from "../../actions/userDataAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SignupNameScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#none"
    }
  };
  state = {
    firstName: "",
    secondName: ""
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Fumi
          label={"First name"}
          iconClass={FontAwesomeIcon}
          iconName={"pencil"}
          iconColor={"#8F52AD"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={text => this.setState({ firstName: text })}
        />
        <Fumi
          style={styles.textFields}
          label={"Second name"}
          iconClass={FontAwesomeIcon}
          iconName={"pencil"}
          iconColor={"#8F52AD"}
          iconSize={20}
          iconWidth={40}
          inputPadding={window.window.height / 40}
          onChangeText={text => this.setState({ secondName: text })}
        />
        <Button
          title="Next"
          color="#8F52AD"
          onPress={() => {
            this.props.changeUserName(this.state);
            this.props.navigation.navigate("SignupEmailAndPassword");
          }}
        />

        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center"
  },
  error: {
    color: "red"
  },
  textFields: {
    marginTop: 30,
    marginBottom: 20
  },
  datepicker: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: window.window.height / 60,
    width: window.window.width
  }
});

function mapStateToProps(state) {
  return {
    userData: state.userData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeUserName
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupNameScreen);
