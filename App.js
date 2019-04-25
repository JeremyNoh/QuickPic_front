console.disableYellowBox = true;

import React from "react";
import { Platform, StatusBar, AsyncStorage } from "react-native";
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
import SplashScreen from "./src/screens/SplashScreen";
import { BACKGROUND_BODY } from "./utils/colors";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

// HeaderStyle For Custom
const headerStyles = {
  headerTintColor: "white",
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: BACKGROUND_BODY,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  }
};

// Navigator for Screen on SIgned Out
const SignedOut = createStackNavigator({
  Auth: {
    screen: Auth,
    navigationOptions: {
      title: "Welcome",
      ...headerStyles
    }
  }
});

// JUST SCREEN FOR AUTO-SIGNIN
const AuthLoading = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen
  }
});

// Navigator for Screen on SignIn && BOTTOM BAR
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
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: "#487eb0",
      inactiveTintColor: "grey",
      showLabel: true,
      style: {
        borderTopWidth: 0,
        paddingTop: 3,
        paddingBottom: 4,
        height: 60,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        backgroundColor: "#40454D",
        shadowOffset: { width: 0, height: 0 }
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      Game,
      SignedOut: {
        screen: SignedOut
      },
      AuthLoading
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
