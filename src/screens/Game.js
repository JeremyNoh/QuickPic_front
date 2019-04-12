import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal
import { Card, Button } from "react-native-elements";

class Game extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Ajouter un Utilisateur",
    headerTintColor: "black",
    headerStyle: {
      backgroundColor: "red"
    }
  });

  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    return (
      <Container>
        <Title title="Game" />
        <Button
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
          title="pop"
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Game;
