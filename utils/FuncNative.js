export const saveInfo = async infoUser => {
  try {
    const value = await AsyncStorage.setItem(
      "infoUser",
      JSON.stringify(infoUser)
    );
    let data = {
      success: true
    };
    return { data };
  } catch (error) {
    let data = {
      errorMessage: error,
      success: false
    };
    return { data };
  }
};
