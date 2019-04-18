import React, { FunctionComponent, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

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

const enCours = [
  {
    idGame: 1,
    start_game: "2019-04-16T18:37:59.661Z",
    end_game: "2019-04-16T19:45:59.661Z",
    item: "velo"
  },
  {
    idGame: 2,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "sac"
  },
  {
    idGame: 3,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "chaussure"
  }
];

const later = [
  {
    idGame: 1,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "stylo"
  },
  {
    idGame: 2,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "verre"
  },
  {
    idGame: 3,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  },
  {
    idGame: 4,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  },
  {
    idGame: 5,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  },
  {
    idGame: 3,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  },
  {
    idGame: 4,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  },
  {
    idGame: 5,
    start_game: "2019-04-16T19:37:59.661Z",
    end_game: "2019-04-16T19:37:59.661Z",
    item: "tee-shirt"
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    selectedIndex: 0
  };

  componentDidMount() {}

  _updateIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };

  SelectGame = infoGame => {
    console.log(infoGame);

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
    let { selectedIndex } = this.state;
    let fluxGame = selectedIndex === 0 ? enCours : later;

    return (
      <View style={{ paddingBottom: "15%" }}>
        <Header
          backgroundColor="#042867"
          centerComponent={{
            text: `Home`,
            style: { color: "#fff" }
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
