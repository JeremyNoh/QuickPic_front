console.disableYellowBox = true;

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

// Screens Import

import Home from "./src/screens/Home";
import SignUp from "./src/screens/SignUp";

const Stack = createStackNavigator({
  SignUp: SignUp,
  Home: Home
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Stack: Stack
    },
    {
      initialRouteName: "Stack"
    }
  )
);
