console.disableYellowBox = true;

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

// Screens Import

import Home from "./src/screens/Home";
import Auth from "./src/screens/Auth";

const Stack = createStackNavigator({
  Auth: Auth,
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
