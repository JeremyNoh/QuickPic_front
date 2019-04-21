import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  AsyncStorage,
  Alert
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { getInfoUser, PutInfoUser } from "../../api/user";
import { API_AVATAR } from "../../endpoint";
import { Loading } from "../components/Loading";

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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  updateStateHandler(key, value) {
    let { user } = this.state;
    user[key] = value;
    this.setState({
      user
    });
  }

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
            style={{
              width: "100%",
              marginTop: 50,
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              padding: 30
            }}
          >
            <Input
              placeholder={"Current password"}
              inputStyle={[{ width: 30 }]}
              containerStyle={{ marginBottom: 20 }}
              value={user.currentPwd}
              onChangeText={val => this.updateStateHandler("currentPwd", val)}
            />
            <Input
              placeholder={"New password"}
              inputStyle={[{ width: 30 }]}
              containerStyle={{ marginBottom: 20 }}
              value={user.newPwd}
              onChangeText={val => this.updateStateHandler("newPwd", val)}
            />
            <Input
              placeholder={"Comfirm password"}
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

  render() {
    let { user, infoUser, editable } = this.state;
    if (!infoUser) {
      return <Loading />;
    }
    return (
      <View style={[styles.View]}>
        <Avatar
          size="large"
          rounded
          source={{
            uri: `${API_AVATAR}/100/${infoUser.uuid}`
          }}
          containerStyle={{ marginTop: 70, marginBottom: 80 }}
        />
        <View style={{ width: "80%" }}>
          <Input
            placeholder={"Email"}
            inputStyle={[{ width: 30 }]}
            containerStyle={[
              { marginBottom: 20 },
              editable ? null : styles.desabledInput
            ]}
            value={user.email}
            onChangeText={val => this.updateStateHandler("email", val)}
            editable={editable}
          />
          <Input
            placeholder={"Nickname"}
            inputStyle={[{ width: 30 }]}
            containerStyle={[
              { marginBottom: 20 },
              editable ? null : styles.desabledInput
            ]}
            value={user.nickname}
            onChangeText={val => this.updateStateHandler("nickname", val)}
            editable={editable}
          />
          <Input
            placeholder={"Firstname"}
            inputStyle={[{ width: 30 }]}
            containerStyle={[
              { marginBottom: 20 },
              editable ? null : styles.desabledInput
            ]}
            value={user.firstname}
            onChangeText={val => this.updateStateHandler("firstname", val)}
            editable={editable}
          />
          <Input
            placeholder={"Lastname"}
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
            style={styles.Button}
            buttonStyle={{
              width: "100%",
              height: 50
            }}
            title="Enregistrer"
            onPress={() => this._updateUser()}
          />
        )}

        {!editable && (
          <Button
            style={styles.Button}
            buttonStyle={{
              width: "100%",
              height: 50
            }}
            title="Modifier Mon compte"
            onPress={() => this.setState({ editable: true })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    height: "33.33%",
    alignItems: "center"
  },
  Button: {
    marginTop: 80
  },
  desabledInput: {
    opacity: 0.3
  }
});
