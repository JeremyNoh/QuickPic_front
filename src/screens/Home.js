import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, Alert, AsyncStorage } from "react-native";

// Internal Component
import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_TWO
} from "../../utils/colors";

// Libs Extenal
import { Button, ButtonGroup, Header } from "react-native-elements";
import CardForPlay from "../components/CardForPlay";
import { ScrollView } from "react-native-gesture-handler";
import { getAllGames } from "../../api/game";

// status
// categoryLibelle
const enCours = [
  {
    idGame: 1,
    startGame: "2019-04-16T18:37:59.661Z",
    endGame: "2019-04-16T19:45:59.661Z",
    itemLibelle: "velo",
    categoryLibelle: "SPORT"
  },
  {
    idGame: 2,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "sac",
    categoryLibelle: "SPORT"
  },
  {
    idGame: 3,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "chaussure",
    categoryLibelle: "Vetement"
  }
];

const later = [
  {
    idGame: 1,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "stylo",
    categoryLibelle: "Quotidien"
  },
  {
    idGame: 2,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "verre",
    categoryLibelle: "Quotidien"
  },
  {
    idGame: 3,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  },
  {
    idGame: 4,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  },
  {
    idGame: 5,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  },
  {
    idGame: 3,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  },
  {
    idGame: 4,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  },
  {
    idGame: 5,
    startGame: "2019-04-16T19:37:59.661Z",
    endGame: "2019-04-16T19:37:59.661Z",
    itemLibelle: "tee-shirt",
    categoryLibelle: "Vetement"
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedIndex: 0,
    allGames: [],
    progressGame: [],
    upcomingGame: []
  };

  async componentDidMount() {
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);
    getAllGames(infoUser.token)
      .then(res => {
        let result = null;
        let progressGame = null;
        let upcomingGame = null;
        if (res.hasOwnProperty("msg")) {
          result = null;
        } else {
          result = res;
          upcomingGame = res.filter(obj => obj.status === "upcoming");
          console.log(res);

          progressGame = res.filter(obj => obj.status === "in progress");
        }
        this.setState({ allGames: result, upcomingGame, progressGame });
      })
      .catch(err => {
        console.log(err);
        this.setState({ allGames: null });
      });
  }

  _updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  SelectGame = infoGame => {
    this.props.navigation.navigate("Game", {
      game: infoGame
    });
  };

  SelectNotYetGame() {
    Alert.alert("Sois Patient", "Cette partie n'est pas encore Disponible", [
      { text: "OK" }
    ]);
  }

  render() {
    let { selectedIndex, progressGame, upcomingGame } = this.state;
    // mock
    // let fluxGame = selectedIndex === 0 ? enCours : later;
    let fluxGame = selectedIndex === 0 ? progressGame : upcomingGame;

    return (
      <View style={{ paddingBottom: "15%" }}>
        <Header
          backgroundColor="#042867"
          centerComponent={{
            text: `Home`,
            style: { color: "#fff", fontWeight: "bold" }
          }}
          rightComponent={{
            icon: "power",
            color: "#fff",
            onPress: () => {
              this.props.navigation.navigate("SignedOut"), AsyncStorage.clear();
            }
          }}
        />
        <View style={{ alignItems: "center" }}>
          <ButtonGroup
            onPress={this._updateIndex}
            selectedIndex={selectedIndex}
            buttons={["En cours", "Prochainement"]}
            containerStyle={{
              height: 30,
              width: 300,
              marginTop: 30,
              justifyContent: "center"
            }}
            selectedButtonStyle={{
              backgroundColor: BUTTON_COLOR_TWO
            }}
          />
        </View>
        <ScrollView style={{ height: "100%" }}>
          {fluxGame.map((element, index) => {
            return (
              <CardForPlay
                key={index}
                props={element}
                onPress={() =>
                  selectedIndex === 0
                    ? this.SelectGame(element)
                    : this.SelectNotYetGame()
                }
                inFuture={selectedIndex === 0 ? false : true}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Home;
