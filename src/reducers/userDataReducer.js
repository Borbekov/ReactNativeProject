const initState = {
   firstName: null,
   secondName: null,
   email: null,
   password: null,
}

const userData = (state = initState, action) => {
  switch (action.type){
    case 'CHANGE_USER_NAME':
      return{
        ...state,
        firstName: action.firstName,
        secondName: action.secondName
      }
    case 'CHANGE_EMAIL_AND_PASSWORD':
      return{
        ...state,
        email: action.email,
        password: action.password
      }
    default:
      return state;
  }
}

export default userData;
