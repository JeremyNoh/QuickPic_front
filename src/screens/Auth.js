import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Alert
} from "react-native";

// Internal Component
import {
  BUTTON_COLOR_ONE,
  BUTTON_COLOR_TWO,
  BACKGROUND_BODY
} from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";

// Libs Extenal
import { Button, ButtonGroup } from "react-native-elements";

import { connecteUser, registerUser } from "../../api/auth";

const COLOR_TEXT = "#fbc531";

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

  componentDidMount() {}

  // SWITCH INTO SIGNIN | SIGNUP
  _updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  //  UPDATE INFO of User
  updateStateHandler = (key, value) => {
    let { user } = this.state;

    user[key] = value;
    this.setState({
      user
    });
  };

  // Navigate to Home
  _submit = () => {
    this.props.navigation.navigate("Home");
  };

  // RECUP champs User and Try to Register
  _register = () => {
    let { user } = this.state;
    registerUser(user)
      .then(res => {
        Alert.alert(
          "Inscription réussi",
          "Je t'invite à te connecter pour commencer à jouer",
          [{ text: "OK" }]
        );
      })
      .catch(err => {
        alert("Error please retry");
      });
  };

  // RECUP champs User and Try to Connect & Stock INfo to Storage
  _connect = async () => {
    let { user } = this.state;
    connecteUser(user)
      .then(async res => {
        let data = {
          email: res.data.user.email,
          nickname: res.data.user.nickname,
          uuid: res.data.user.uuid,
          token: res.token,
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname
        };
        await AsyncStorage.setItem("infoUser", JSON.stringify(data));

        this._submit();
      })
      .catch(err => {
        alert("Error please retry");
        console.log(err);
      });
  };

  // Regex for Check Email
  _validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  // VIEW - For Connect
  connectionView = () => {
    let { user } = this.state;

    return (
      <View style={{ marginTop: 200 }}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.username}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={val => this.updateStateHandler("username", val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.password}
          placeholder="Password"
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={val => this.updateStateHandler("password", val)}
        />

        <Button
          onPress={() => this._connect()}
          buttonStyle={styles.Button}
          disabled={!(user.username.length >= 6 && user.password.length >= 6)}
          disabledStyle={styles.desabled}
          disabledTitleStyle={{ color: COLOR_TEXT }}
          title="Se connecter"
        />
        {/* 
        <Text style={{ textDecorationLine: "underline" }}>
          Mot de Passe oublié
        </Text> */}
      </View>
    );
  };

  // VIEW - For Register
  registerView = () => {
    let { user } = this.state;
    return (
      <View style={{ marginTop: 200 }}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.email}
          placeholder="Email"
          autoCapitalize="none"
          textContentType="emailAddress"
          onChangeText={val => this.updateStateHandler("email", val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.username}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={val => this.updateStateHandler("username", val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={val => this.updateStateHandler("password", val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholderTextColor={COLOR_TEXT}
          value={user.confirmPassword}
          placeholder="Confirmer le password"
          secureTextEntry={false}
          autoCorrect={false}
          onChangeText={val => this.updateStateHandler("confirmPassword", val)}
        />

        <Button
          onPress={() => this._register()}
          buttonStyle={styles.Button}
          title="S'enregistrer"
          disabled={
            !(
              user.username.length >= 6 &&
              user.password.length >= 6 &&
              user.password.length >= 6 &&
              user.confirmPassword === user.password &&
              this._validateEmail(user.email)
            )
          }
          disabledStyle={styles.desabled}
          disabledTitleStyle={{ color: COLOR_TEXT }}
        />
      </View>
    );
  };

  render() {
    let { selectedIndex } = this.state;

    return (
      <Container>
        <View style={{ position: "absolute", top: 70, alignItems: "center" }}>
          <View style={{ transform: [{ rotate: "-10deg" }] }}>
            <Title title="QuickPic" />
          </View>
          <ButtonGroup
            onPress={this._updateIndex}
            selectedIndex={selectedIndex}
            buttons={["Se Connecter", "S'inscrire"]}
            containerStyle={{
              height: 30,
              width: 300,
              marginTop: 100,
              borderRadius: 20,
              backgroundColor: BACKGROUND_BODY,
              borderColor: COLOR_TEXT
            }}
            selectedButtonStyle={[
              {
                backgroundColor: COLOR_TEXT
              }
            ]}
            selectedTextStyle={{
              color: BACKGROUND_BODY
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
    borderBottomColor: COLOR_TEXT,
    color: "white",
    width: 300
  },
  Button: {
    height: 50,
    backgroundColor: COLOR_TEXT,
    marginBottom: 10,
    marginTop: 90,
    borderRadius: 50
  },
  desabled: {
    height: 50,
    backgroundColor: BACKGROUND_BODY,
    borderWidth: 1,
    borderColor: COLOR_TEXT,
    borderRadius: 50
  }
});

export default Auth;
