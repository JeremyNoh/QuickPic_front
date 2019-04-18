import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal

class Historic extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render() {
    return (
      <Container>
        <Title title="Historic" />
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default Historic;
