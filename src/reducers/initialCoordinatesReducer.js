const initCoords = {
  latitude: 43.219842549999996,
  longitude: 76.91835188749678,
  latitudeDelta: 0.99,
  longitudeDelta: 0.99,
}

const initialCoordinates = (state = initCoords, action) => {
  switch(action.type){
    case 'CREATE_INITIAL_COORD':
    return{
      ...state,
      latitude: action.latitude,
      longitude: action.longitude,
      latitudeDelta: action.latitudeDelta,
      longitudeDelta: action.longitudeDelta,
    }

    default:
      return state;
  }
}

export default initialCoordinates;
