import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Home from "./src/screens/Home";
import Auth from "./src/screens/Auth";
import Profile from "./src/screens/Profile";
import History from "./src/screens/History";
import Ranking from "./src/screens/Ranking";
import Game from "./src/screens/Game";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

const SignedOut = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  }
});

const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="history" size={30} color={tintColor} />
        )
      }
    },
    Ranking: {
      screen: Ranking,
      navigationOptions: {
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="star" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },

  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

function canConnnect() {
  return true;
}

export default createAppContainer(
  createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      Game,
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: canConnnect() === true ? "SignedIn" : "SignedOut"
    }
  )
);