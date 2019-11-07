export const putInitialCoordinates = (latitude, longitude) => {
  if((latitude && longitude) !== undefined || null){
    return {
      type: "CREATE_INITIAL_COORD",
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  }
}
