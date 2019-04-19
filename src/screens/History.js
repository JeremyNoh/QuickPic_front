import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";

// Internal Component
import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_TWO
} from "../../utils/colors";

// Libs Extenal
import { Header } from "react-native-elements";
import CardRanking from "../components/CardRanking";
import { Loading } from "../components/Loading";
import { getHistory } from "../../api/game";
import Container from "../components/Container";

const HistoryPlayer = [
  {
    position: 1,
    username: "Thomaasss",
    score: 100
  },
  {
    position: 2,
    username: "Antoine",
    score: 97
  },
  {
    position: 3,
    username: "Jeremy",
    score: 95
  },
  {
    position: 4,
    username: "Juliette",
    score: 73
  },
  {
    position: 5,
    username: "Jonathan",
    score: 50
  },
  {
    position: 5,
    username: "Joel",
    score: 50,
    isCurrentUser: true
  }
];

class Historic extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    historyPlayer: undefined
  };

  async componentDidMount() {
    // Retrieve Usertoken and Send It

    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    getHistory(infoUser.uuid)
      .then(res => {
        console.log(res);

        this.setState({ historyPlayer: null });
      })
      .catch(err => {
        this.setState({ historyPlayer: null });
        console.log(err);
      });
  }

  _noData = () => {
    return <Text h4>Il n'y a pas de donnée </Text>;
  };

  render() {
    let { historyPlayer } = this.state;

    if (historyPlayer === undefined) {
      return <Loading />;
    } else if (historyPlayer === null) {
      return <Container>{this._noData()}</Container>;
    }

    return (
      <View style={{ paddingBottom: "10%" }}>
        <Header
          backgroundColor="#042867"
          centerComponent={{
            text: `Classement Mondial`,
            style: { color: "#fff" }
          }}
        />
        <ScrollView style={{ height: "100%" }}>
          {historyPlayer.map((element, index) => {
            return (
              <CardRanking
                key={index}
                props={element}
                itMe={element.isCurrentUser ? true : false}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Historic;
