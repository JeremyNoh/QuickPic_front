import React from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
  CameraRoll,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Switch
} from "react-native";

// Libs Extenal
import { Camera, Permissions } from "expo";
import CountDown from "react-native-countdown-component";
import { Button, Text, Header } from "react-native-elements";
import { RNS3 } from "react-native-aws3";

// Internal Component
import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_ONE
} from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";
import { Loading } from "../components/Loading";
import { PostScoreInOneGame } from "../../api/game";
import { OPTIONS_AWS } from "../../utils/const";

class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    game: undefined,
    hasCameraPermission: null,
    modalVisible: false,
    type: Camera.Constants.Type.back,
    switchValue: true,
    imageuri: "",
    url: ""
  };

  async componentDidMount() {
    console.log("test");

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    const game = this.props.navigation.getParam("game", undefined);
    if (game === undefined) {
      this.setState({ game: null, infoUser });
    } else {
      this.setState({ game, infoUser });
    }
  }
  cameraChange = () => {
    this.setState({
      imageuri: "",
      url: "",
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  _snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo) {
        this.setState({ imageuri: photo.uri });
      }
    }
  };

  _sendScoreToApi = () => {
    let { infoUser, game } = this.state;
    PostScoreInOneGame(infoUser.token, game.idGame, {
      pourcentage: Math.floor(Math.random() * Math.floor(101)),
      uuid: infoUser.uuid
    })
      .then(res => {
        console.log(res);
        this.setModalVisible(false);
      })
      .catch(err => {
        this.setModalVisible(false);
        Alert.alert("Error please retry");
        console.log(err);
      });
  };

  upload = () => {
    const file = {
      uri: this.state.imageuri,
      name: `${new Date().getTime()}.jpg`,
      type: "image/jpeg"
    };

    return RNS3.put(file, OPTIONS_AWS)
      .then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        else {
          console.log(
            "Successfully uploaded image to s3. s3 bucket url: ",
            response.body.postResponse.location
          );
          this.setState({
            url: response.body.postResponse.location,
            switchValue: false
          });
        }
      })
      .catch(error => {
        console.log("error");

        console.log(error);
      });
  };

  _noData = () => <Text h4>Il n'y a pas de donnée </Text>;

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: "Photos"
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {});
  };

  intoModal = () => {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>

          <Button
            onPress={() => {
              this.setModalVisible(false);
            }}
            buttonStyle={styles.Button}
            title="Retour"
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              {this.state.imageuri != "" ? (
                <Image
                  source={{
                    uri: this.state.imageuri
                  }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                >
                  <View style={styles.camerabuttonview}>
                    <TouchableOpacity
                      style={styles.cameraButtons}
                      onPress={this.cameraChange}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white"
                        }}
                      >
                        Flip
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          ) : (
            <View style={styles.cameraview}>
              {this.state.url != "" && (
                <Text>Uploaded url : {this.state.url}</Text>
              )}
            </View>
          )}
          {this.state.switchValue && (
            <View style={styles.buttonsView}>
              {this.state.imageuri == "" ? (
                <View style={styles.captureButtonView}>
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this._snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.captureButtonView}>
                <TouchableOpacity
                  style={styles.cameraButtons}
                  onPress={this.upload}
                  disabled={!!!this.state.imageuri}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {this.state.url === "" && (
            <Button
              onPress={() => {
                this.setModalVisible(false);
              }}
              buttonStyle={styles.Button}
              title="Retour"
            />
          )}
          {this.state.url != "" && (
            <Button
              onPress={() => {
                this._sendScoreToApi();
              }}
              title="Valider mon choix"
              containerStyle={{
                marginTop: 10,
                justifyContent: "center"
              }}
              buttonStyle={styles.Button}
            />
          )}
        </View>
      );
    }
  };

  modalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {this.intoModal()}
      </Modal>
    );
  };

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
            onPress={() => {
              this.setModalVisible(true);
            }}
            title="Prendre En Photo"
            containerStyle={{
              marginHorizontal: 10,
              marginTop: 40,
              height: 100
            }}
            buttonStyle={{ backgroundColor: "#042867" }}
          />

          {this.modalView()}
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7886D7",
    alignItems: "center",
    justifyContent: "center"
  },
  switchview: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5
  },
  switch: {
    padding: 5
  },
  cameraview: {
    height: 400,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    height: "95%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camerabuttonview: {
    height: "100%",
    backgroundColor: "transparent"
  },
  cameraButtons: {
    borderColor: "#fff",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  captureButtonView: {
    height: 200
  },
  buttonsView: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadedImage: {
    height: "90%",
    width: "90%",
    padding: 10
  },
  Button: {
    backgroundColor: BUTTON_COLOR_ONE,
    marginBottom: 10,
    marginTop: 10,
    width: "100%"
  }
});

export default Game;
