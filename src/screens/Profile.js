import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal
import { Card, Button } from "react-native-elements";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  static navigationOptions = ({ navigation }) => ({
    title: "QuickPic",
    headerTintColor: TEXT_HEADER,
    headerStyle: {
      backgroundColor: BACKGROUND_HEADER
    }
  });

  render() {
    return (
      <Container>
        <Title title="Profile" />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Profile;
