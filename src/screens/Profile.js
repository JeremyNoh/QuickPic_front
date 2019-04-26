import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  AsyncStorage,
  Alert,
  Dimensions,
  TextInput
} from "react-native";

// Libs Extenal
import { Avatar, Button, Input } from "react-native-elements";

// Internal Component
import { getInfoUser, PutInfoUser } from "../../api/user";
import { API_AVATAR } from "../../endpoint";
import { Loading } from "../components/Loading";
import { BACKGROUND_BODY, COLOR_TEXT } from "../../utils/colors";
import Container from "../components/Container";

export default class Profile extends React.Component {
  state = {
    modalVisible: false,
    email: "",
    user: {
      nickname: "",
      firstname: "",
      lastname: "",
      email: "",
      currentPwd: "",
      newPwd: "",
      confirmPwd: ""
    },
    editable: false
  };

  // GET - INFO OF USER
  async componentDidMount() {
    let { user } = this.state;
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    getInfoUser(infoUser.token, infoUser.uuid)
      .then(res => {
        // console.log(res);

        this.setState({});
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Error Please retry.");
        this.setState({ allGames: null });
      });

    user = {
      email: infoUser.email,
      firstname: infoUser.firstname,
      lastname: infoUser.lastname,
      nickname: infoUser.nickname
    };
    this.setState({
      user,
      infoUser
    });
  }

  // OPEN | CLOSE Modal
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // UPDATE info of user
  updateStateHandler(key, value) {
    let { user } = this.state;
    user[key] = value;
    this.setState({
      user
    });
  }

  // Regex for Check Email
  _validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  // PUT - TO upadte info user on API | DATABASE && ASynctorage
  _updateUser = () => {
    let { user, infoUser, editable } = this.state;
    PutInfoUser(infoUser.token, infoUser.uuid, user)
      .then(async res => {
        const MajInfoUser = Object.assign(infoUser, user);
        await AsyncStorage.setItem("infoUser", JSON.stringify(MajInfoUser));
        Alert.alert("ton profile à été mis à jour");
      })
      .catch(err => {
        Alert.alert("Error Please retry.");
      });
    this.setState({ editable: false });
  };

  // VIEW - modal
  modalView() {
    const { modalVisible, user } = this.state;
    if (modalVisible) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={[
              {
                width: "100%",
                marginTop: 50,
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
                padding: 30
              },
              styles.bg
            ]}
          >
            <TextInput
              placeholder={"Current password"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={{ marginBottom: 20 }}
              value={user.currentPwd}
              onChangeText={val => this.updateStateHandler("currentPwd", val)}
            />
            <TextInput
              placeholder={"New password"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={{ marginBottom: 20 }}
              value={user.newPwd}
              onChangeText={val => this.updateStateHandler("newPwd", val)}
            />
            <TextInput
              placeholder={"Comfirm password"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={{ marginBottom: 20 }}
              value={user.confirmPwd}
              onChangeText={val => this.updateStateHandler("confirmPwd", val)}
            />

            <Button
              style={styles.Button}
              buttonStyle={{
                width: "100%",
                height: 50
              }}
              title="Enregistrer"
            />
            <Button
              style={styles.Button}
              buttonStyle={{
                width: "100%",
                height: 50,
                backgroundColor: "grey"
              }}
              title="Annuler"
              onPress={() => this.setState({ modalVisible: false })}
            />
          </View>
        </Modal>
      );
    }
  }

  // set
  _canModify = () => {
    this.setState({ editable: true });
  };

  render() {
    let { user, infoUser, editable } = this.state;
    if (!infoUser) {
      return <Loading />;
    }
    return (
      <View style={styles.AllView}>
        <View style={[styles.View, styles.bg]}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: `${API_AVATAR}/100/${infoUser.uuid}`
            }}
            containerStyle={{ marginTop: 70, marginBottom: 80 }}
          />
          <View style={[{ width: "80%" }, styles.bg]}>
            <TextInput
              placeholder={"Email"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={[
                { marginBottom: 20 },
                editable ? null : styles.desabledInput
              ]}
              value={user.email}
              onChangeText={val => this.updateStateHandler("email", val)}
              editable={editable}
            />
            <TextInput
              placeholder={"Nickname"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={[
                { marginBottom: 20 },
                editable ? null : styles.desabledInput
              ]}
              value={user.nickname}
              onChangeText={val => this.updateStateHandler("nickname", val)}
              editable={editable}
            />
            <TextInput
              placeholder={"Firstname"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={[
                { marginBottom: 20 },
                editable ? null : styles.desabledInput
              ]}
              value={user.firstname}
              onChangeText={val => this.updateStateHandler("firstname", val)}
              editable={editable}
            />
            <TextInput
              placeholder={"Lastname"}
              placeholderTextColor={COLOR_TEXT}
              style={styles.TextInput}
              inputStyle={[{ width: 30 }]}
              containerStyle={[
                { marginBottom: 20 },
                editable ? null : styles.desabledInput
              ]}
              value={user.lastname}
              onChangeText={val => this.updateStateHandler("lastname", val)}
              editable={editable}
            />

            {this.modalView()}

            <Button
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}
              title="Change password"
              type="clear"
              titleStyle={{
                fontSize: 15
              }}
              buttonStyle={{
                alignContent: "flex-end"
              }}
            />
          </View>

          <Text>{this.state.email}</Text>

          {editable && (
            <Button
              onPress={() => this._updateUser()}
              buttonStyle={styles.Button}
              title="Enregistrer"
              disabled={
                !(user.nickname.length >= 6 && this._validateEmail(user.email))
              }
              disabledStyle={styles.desabled}
              disabledTitleStyle={{ color: COLOR_TEXT }}
            />
          )}

          {!editable && (
            <Button
              onPress={() => this._canModify()}
              buttonStyle={styles.Button}
              title="Modifier Mon compte"
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    height: "33.33%",
    alignItems: "center",
    backgroundColor: BACKGROUND_BODY
  },
  bg: {
    backgroundColor: BACKGROUND_BODY
  },
  desabledInput: {
    opacity: 0.3
  },
  // desabled: {
  //   backgroundColor: "#787879"
  // },
  AllView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: BACKGROUND_BODY
  },
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
    marginTop: 80,
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
