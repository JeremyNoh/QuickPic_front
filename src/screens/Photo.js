import React, { FunctionComponent, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

// Libs Extenal
import { Camera, Permissions, ImagePicker } from "expo";
import CountDown from "react-native-countdown-component";
import { Button, Text, Header } from "react-native-elements";

// Internal Component
import { BACKGROUND_HEADER, TEXT_HEADER } from "../../utils/colors";
import Container from "../components/Container";
import Title from "../components/Title";
import { Loading } from "../components/Loading";

class Photo extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Start The Game",
    headerTintColor: "black",
    headerStyle: {
      backgroundColor: "red"
    }
  });

  constructor(props) {
    super(props);
  }
  state = {
    game: undefined,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
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

  _noData = () => {
    return <Text h4>Il n'y a pas de donnée </Text>;
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      console.log("result : " + result);

      this.setState({ image: result.uri });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, marginTop: 20 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});

export default Photo;
