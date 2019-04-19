import React from "react";
import { View, StyleSheet, TouchableHighlight, Modal } from "react-native";

// Libs Extenal
import { Camera, Permissions, ImagePicker } from "expo";
import CountDown from "react-native-countdown-component";
import { Button, Text, Header } from "react-native-elements";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";
import { Loading } from "../components/Loading";

class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    game: undefined,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    modalVisible: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const game = this.props.navigation.getParam("game", undefined);
    if (game === undefined) {
      this.setState({ game: null });
    } else {
      this.setState({ game });
    }
  }

  _noData = () => <Text h4>Il n'y a pas de donnée </Text>;

  _pickImage = () => {
    console.log("lauch Caméra");
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    let { game } = this.state;

    if (game === undefined) {
      return <Loading />;
    } else if (game === null) {
      return <Container>{this._noData()}</Container>;
    }
    return (
      <View style={{ paddingBottom: "7%" }}>
        <Header
          backgroundColor="#042867"
          leftComponent={{
            icon: "home",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("Home")
          }}
          centerComponent={{
            text: `Partie n° ${game.idGame}`,
            style: { color: "#fff" }
          }}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
          title="Retour"
          containerStyle={{
            marginHorizontal: 10,
            marginTop: 40
          }}
          buttonStyle={{ backgroundColor: "#042867" }}
        />
        <View style={{ marginTop: "30%", alignItems: "center" }}>
          <Title title={game.itemLibelle.toUpperCase()} />
          <CountDown
            until={220}
            onFinish={() => alert("finished")}
            digitStyle={{ backgroundColor: "#2062D5", marginTop: 100 }}
            size={30}
          />

          <Button
            onPress={() => this._pickImage()}
            title="Prendre En Photo"
            containerStyle={{
              marginHorizontal: 10,
              marginTop: 40,
              height: 100
            }}
            buttonStyle={{ backgroundColor: "#042867" }}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text>Show Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Game;
