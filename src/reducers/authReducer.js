const initState = {
   authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log("Login failed!!!");
      return {
        ...state,
        authError: 'Login failed!'
      }
    case 'LOGIN_SUCCESS':
      console.log("Login success!!!");
      return {
        ...state,
        authError: null
      }

    case 'SIGNOUT_SUCCES':
      console.log("Sign out success!!!");
      return state;

    case 'SIGNUP_SUCCESS':
      console.log("Sign up success!!!");
      return state;
      
    case 'SIGNUP_ERROR':
      console.log("Sign up failed!!!");
      return{
        ...state,
        authError: action.payload.message
      }
    default:
      return state;
  }
}

export default authReducer;
