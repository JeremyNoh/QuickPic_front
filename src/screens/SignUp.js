import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

// External Component

// Internal Component

import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_ONE,
  BUTTON_COLOR_TWO,
  BUTTON_COLOR_THREE
} from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";
import Form from "../components/Form";

// Libs Extenal
import { Button, ButtonGroup } from "react-native-elements";

class SignUp extends React.Component {
  state = {
    user: {
      prenom: "",
      nom: "",
      email: "",
      Password: ""
    },
    selectedIndex: 0
  };

  static navigationOptions = ({ navigation }) => ({
    title: "QuickPic",
    headerTintColor: TEXT_HEADER,
    headerStyle: {
      backgroundColor: BACKGROUND_HEADER
    }
  });

  componentDidMount() {}

  updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  updateStateHandler = (key, value) => {
    let { user } = this.state;

    user[key] = value;
    this.setState({
      user
    });
  };

  _submit = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    let { user, selectedIndex } = this.state;

    return (
      <Container>
        <Title title="QuickPic" />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={["Se Connecter", "S'inscrire"]}
          containerStyle={{
            height: 30,
            width: 300
          }}
          selectedButtonStyle={{
            backgroundColor: BUTTON_COLOR_TWO
          }}
        />
        <TextInput
          style={styles.TextInput}
          value={user.email}
          placeholder="Email"
          onChangeText={val => this.updateStateHandler("email", val)}
        />
        <TextInput
          style={styles.TextInput}
          value={user.password}
          placeholder="Password"
          type="password"
          onChangeText={val => this.updateStateHandler("password", val)}
        />
        <TextInput
          style={styles.TextInput}
          value={user.password}
          placeholder="Password"
          type="password"
          onChangeText={val => this.updateStateHandler("password", val)}
        />
        <TextInput
          style={styles.TextInput}
          value={user.password}
          placeholder="Password"
          type="password"
          onChangeText={val => this.updateStateHandler("password", val)}
        />

        <View style={{ padding: 20, width: "100%" }}>
          <Button
            onPress={() => this._submit()}
            buttonStyle={{
              backgroundColor: BUTTON_COLOR_ONE,
              marginBottom: 10
            }}
            title="Se Connecter"
          />

          <Text style={{ textDecorationLine: "underline" }}>
            Mot de Passe oublié
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TextInput: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 40,
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    color: "#000",
    width: 300
  }
});

export default SignUp;
