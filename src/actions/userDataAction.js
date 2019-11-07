export const changeUserName = function(state) {
  return {
    type: "CHANGE_USER_NAME",
    firstName: state.firstName,
    secondName: state.secondName,
  };
}

export const changeEmailAndPassword = function(state) {
  return {
    type: "CHANGE_EMAIL_AND_PASSWORD",
    email: state.email,
    password: state.password
  };
}
