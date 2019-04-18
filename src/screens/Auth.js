import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage } from "react-native";

// External Component

// Internal Component

import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_ONE,
  BUTTON_COLOR_TWO
} from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal
import { Button, ButtonGroup } from "react-native-elements";

import { connecteUser, registerUser } from "../../api/auth";

class Auth extends React.Component {
  state = {
    user: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
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

  _updateIndex = selectedIndex => {
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

  _register = () => {
    let { user } = this.state;
    registerUser(user)
      .then(res => {
        console.log("sa marche", res);
      })
      .catch(err => {
        alert("Error please retry");

        console.log(err, "dedededeede");
      });
  };

  _connect = () => {
    let { user } = this.state;
    connecteUser(user)
      .then(res => {
        console.log("sa marche", res);
      })
      .catch(err => {
        alert("Error please retry");
        console.log(err, "dedededeede");
      });

    this._submit();
  };

  connectionView = () => {
    let { user } = this.state;
    return (
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.TextInput}
          value={user.username}
          placeholder="Username"
          onChangeText={val => this.updateStateHandler("username", val)}
        />
        <TextInput
          style={styles.TextInput}
          value={user.password}
          placeholder="Password"
          type="password"
          onChangeText={val => this.updateStateHandler("password", val)}
        />

        <Button
          onPress={() => this._connect()}
          buttonStyle={styles.Button}
          title="Se connecter"
        />

        <Text style={{ textDecorationLine: "underline" }}>
          Mot de Passe oublié
        </Text>
      </View>
    );
  };

  registerView = () => {
    let { user } = this.state;
    return (
      <View>
        <TextInput
          style={styles.TextInput}
          value={user.email}
          placeholder="Email"
          onChangeText={val => this.updateStateHandler("email", val)}
        />
        <TextInput
          style={styles.TextInput}
          value={user.username}
          placeholder="Username"
          onChangeText={val => this.updateStateHandler("username", val)}
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
          value={user.confirmPassword}
          placeholder="Confirmer le password"
          onChangeText={val => this.updateStateHandler("confirmPassword", val)}
        />

        <Button
          onPress={() => this._register()}
          buttonStyle={styles.Button}
          title="S'enregistrer"
        />

        <Text style={{ textDecorationLine: "underline" }}>
          Mot de Passe oublié
        </Text>
      </View>
    );
  };

  render() {
    let { selectedIndex } = this.state;

    return (
      <Container>
        <View style={{ position: "absolute", top: 70, alignItems: "center" }}>
          <Title title="QuickPic" />
          <ButtonGroup
            onPress={this._updateIndex}
            selectedIndex={selectedIndex}
            buttons={["Se Connecter", "S'inscrire"]}
            containerStyle={{
              height: 30,
              width: 300,
              marginTop: 30
            }}
            selectedButtonStyle={{
              backgroundColor: BUTTON_COLOR_TWO
            }}
          />
        </View>
        {selectedIndex === 0 && this.connectionView()}
        {selectedIndex === 1 && this.registerView()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TextInput: {
    alignItems: "center",
    height: 40,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d7da",
    color: "black",
    width: 300
  },
  Button: {
    backgroundColor: BUTTON_COLOR_ONE,
    marginBottom: 10,
    marginTop: 10
  }
});

export default Auth;
