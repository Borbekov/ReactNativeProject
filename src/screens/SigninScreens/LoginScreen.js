import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/Entypo";
import { Fumi } from "react-native-textinput-effects";
import { signIn } from "../../actions/authAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: "",
    password: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.uid) {
      if (this.props.auth.uid !== prevProps.auth.uid) {
        this.props.navigation.navigate("Main");
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <Fumi
            label={"Email"}
            iconClass={FontAwesomeIcon}
            iconName={"mail"}
            iconColor={"#8F52AD"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            onChangeText={text => this.setState({ email: text })}
          />
          <Fumi
            style={styles.textFieldPassword}
            label={"Password"}
            iconClass={FontAwesomeIcon}
            iconName={"key"}
            iconColor={"#8F52AD"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
          />
          <Button
            title="Login"
            color="#8F52AD"
            onPress={() => this.props.signIn(this.state)}
          />

          {this.props.authError && (
            <Text style={styles.error}>{this.props.authError}</Text>
          )}
        </KeyboardAvoidingView>
        <View>
          <Text
            onPress={() => this.props.navigation.navigate("SignupName")}
            style={styles.signUp}
          >
            Sign up?
          </Text>
        </View>
      </View>
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
  textFieldPassword: {
    marginTop: 30,
    marginBottom: 40
  },
  signUp: {
    color: "#8F52AD",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signIn
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
