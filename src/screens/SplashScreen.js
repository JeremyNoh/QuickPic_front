import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal
import { Card, Button } from "react-native-elements";
import { Loading } from "../components/Loading";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  async componentWillMount() {
    const infoUser = await AsyncStorage.getItem("infoUser");
    if (infoUser) {
      this.props.navigation.navigate("SignedIn");
      return true;
    } else {
      this.props.navigation.navigate("SignedOut");
      return false;
    }
  }

  render() {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default SplashScreen;
