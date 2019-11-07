import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, KeyboardAvoidingView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import { changeEmailAndPassword } from '../../actions/userDataAction';
import { signUp } from '../../actions/authAction';
import { bindActionCreators } from "redux"
import { connect } from 'react-redux';

class SignupEmailAndPasswordScreen extends Component{
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'none',
    },
  };

  state = {
    email: '',
    password: '',
    passwordConfirm: '',
  }

  componentDidUpdate(prevProps){
    if(this.props.userData !== prevProps.userData){
      this.props.signUp(this.props.userData)
    }

    if(this.props.auth.uid){
      if(this.props.auth.uid !== prevProps.auth.uid){
        this.props.navigation.navigate('Main');
      }
    }
  }

  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Fumi
          label={'Email address'}
          iconClass={FontAwesomeIcon}
          iconName={'mail'}
          iconColor={'#8F52AD'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          onChangeText={(text)=>this.setState({email: text})}
        />
        <Fumi
          style={styles.textFieldPassword}
          label={'Password'}
          iconClass={FontAwesomeIcon}
          iconName={'key'}
          iconColor={'#8F52AD'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={true}
          onChangeText={(text)=>this.setState({password: text})}
        />
        <Fumi
          style={styles.textFieldConfirmPassword}
          label={'Confirm password'}
          iconClass={FontAwesomeIcon}
          iconName={'key'}
          iconColor={'#8F52AD'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          secureTextEntry={true}
          onChangeText={(text)=>this.setState({passwordConfirm: text})}
        />
        {this.state.password !== this.state.passwordConfirm && <Text style={styles.error}>EEE</Text>}
        <Button title="Sign Up" color="#8F52AD"
          onPress={()=>{
              this.props.changeEmailAndPassword(this.state);

            }
          }
        />

        <View style={{height: 60}} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  },
  textFieldPassword: {
    marginTop: 25,
  },
  textFieldConfirmPassword: {
    marginTop: 12,
    marginBottom: 20,
  },
  signUp:{
    color: '#8F52AD',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
})

function mapStateToProps(state){
  return{
    userData: state.userData,
    auth: state.firebase.auth
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      changeEmailAndPassword,
      signUp
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupEmailAndPasswordScreen);
