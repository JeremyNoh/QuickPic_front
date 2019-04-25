import React from "react";
import {
  AsyncStorage,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

// Libs Extenal
import { Camera, Permissions } from "expo";
import CountDown from "react-native-countdown-component";
import { Button, Text, Header, Overlay } from "react-native-elements";
import { RNS3 } from "react-native-aws3";
import Toast, { DURATION } from "react-native-easy-toast";

// Internal Component
import { BUTTON_COLOR_ONE } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";
import { Loading } from "../components/Loading";
import { PostScoreInOneGame, ReconnaissanceImage } from "../../api/game";
import { OPTIONS_AWS } from "../../utils/const";
import moment from "moment";

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
    url: "",
    loadingResult: false,
    matchingImage: undefined,
    score: undefined
  };

  // Retrieve info of the game && ask Permission to Camera
  async componentDidMount() {
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

  // Take A picture
  _snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      if (photo) {
        this.setState({ imageuri: photo.uri });
      }
    }
  };

  // add score on USER profile API
  _sendScoreToApi = () => {
    let { infoUser, game, matchingImage } = this.state;

    // this.setModalVisible(false);

    let objCorrectly = matchingImage.filter(v =>
      v.tag.fr.toLowerCase().includes(game.itemLibelle.toLowerCase())
    );
    let pourcent = 0;
    if (objCorrectly.length === 0) {
    } else {
      pourcent = Math.round(objCorrectly[0].confidence);
    }

    console.log(pourcent + "% de correspondance Avec l'objet");

    PostScoreInOneGame(infoUser.token, game.idGame, {
      pourcentage: pourcent,
      uuid: infoUser.uuid,
      time: Math.floor(Math.random() * Math.floor(60))
    })
      .then(res => {
        let score = res.calcul;
        console.log(`tu as gagné ${score} point `);
        this._goToScreen(score);
      })
      .catch(err => {
        this.setModalVisible(false);
        Alert.alert("Error please retry");
        console.log(err);
      });
  };

  _goToScreen = score => {
    this.setState({ modalVisible: false, score }, () => {
      this.refs.toast.show(`tu as gagné ${score} point `, 500, () => {
        // something you want to do at close

        this.props.navigation.navigate("Home");
      });
    });
    //
  };

  // Stock photo on AWS - S3
  upload = () => {
    const file = {
      uri: this.state.imageuri,
      name: `${new Date().getTime()}.jpg`,
      type: "image/jpeg"
    };

    this.setState({ loadingResult: true });

    return RNS3.put(file, OPTIONS_AWS)
      .then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        else {
          console.log(
            "Successfully uploaded image to s3. s3 bucket url: ",
            response.body.postResponse.location
          );
          this.setState(
            {
              url: response.body.postResponse.location,
              switchValue: false
            },
            () => {
              this._getInfoScore();
            }
          );
        }
      })
      .catch(error => {
        console.log("error");

        console.log(error);
      });
  };

  // GET - all description of the Picture
  _getInfoScore = () => {
    let { url } = this.state;

    ReconnaissanceImage(url)
      .then(res => {
        this.setState({ loadingResult: false, matchingImage: res });
      })
      .catch(err => {
        this.setState({ loadingResult: false, matchingImage: null });
      });
  };

  // VIEW -  NO DATA
  _noData = () => <Text h4>Il n'y a pas de donnée </Text>;

  // OPEN | CLOSE modal
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // VIEW - into the modal
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
              {this.state.url != "" &&
                this.state.matchingImage && [
                  <Text h4 key={1}>
                    {" "}
                    Ton Image Ressemble à :{" "}
                  </Text>,
                  <Text h5 key={2}>
                    - {Math.round(this.state.matchingImage[0].confidence)}%
                    un(e) {this.state.matchingImage[0].tag.fr}
                  </Text>,
                  <Text h5 key={3}>
                    {" "}
                    - {Math.round(this.state.matchingImage[1].confidence)}%
                    un(e) {this.state.matchingImage[1].tag.fr}
                  </Text>,
                  <Text h5 key={4}>
                    {" "}
                    - {Math.round(this.state.matchingImage[2].confidence)}%
                    un(e) {this.state.matchingImage[2].tag.fr}
                  </Text>
                ]}
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
                {!!this.state.imageuri && (
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
                )}
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
              disabled={!(this.state.score === undefined)}
              buttonStyle={styles.Button}
            />
          )}
        </View>
      );
    }
  };

  // VIEW - OVERLAY for loadingScreen and not touch
  _waitResult = () => {
    let { loadingResult } = this.state;
    return (
      <Overlay isVisible={loadingResult}>
        <Container>
          <ActivityIndicator size="large" color="#0000ff" />

          <Text style={{ marginTop: 10 }}> Calcule de l'image...</Text>
        </Container>
      </Overlay>
    );
  };

  // VIEW - Modal
  modalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        {this._waitResult()}
        {this.intoModal()}
      </Modal>
    );
  };

  // transform time remaning in second for the countdown
  _transformInSecond = () => {
    let { game } = this.state;

    let [minutes, second] = moment
      .utc(
        moment(
          moment.unix(game.endGame).format("DD/MM/YYYY HH:mm:ss"),
          "DD/MM/YYYY HH:mm:ss"
        ).diff(
          moment(moment().format("DD/MM/YYYY HH:mm:ss"), "DD/MM/YYYY HH:mm:ss")
        )
      )
      .format("mm:ss")
      .split(":");

    return parseInt(minutes) * 60 + parseInt(second);
  };

  render() {
    let { game } = this.state;

    if (game === undefined) {
      return <Loading />;
    } else if (game === null) {
      return <Container>{this._noData()}</Container>;
    }

    let timeInSecond = this._transformInSecond();
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
        <Toast ref="toast" />

        <View style={{ marginTop: "30%", alignItems: "center" }}>
          <Title title={game.itemLibelle.toUpperCase()} />
          <CountDown
            until={timeInSecond}
            onFinish={() => this.props.navigation.navigate("Home")}
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
            disabled={!(this.state.score === undefined)}
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
