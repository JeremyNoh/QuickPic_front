import React from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

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
import { getRanking } from "../../api/game";
import Container from "../components/Container";

const RankPLayer = [
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

class Ranking extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    rankPLayer: undefined
  };

  componentDidMount() {
    // Retrieve Usertoken and Send It

    getRanking("user")
      .then(res => {
        let result = res.filter(obj => !obj.isCurrentUser);
        let [valueTopPushFirst] = res.filter(obj => obj.isCurrentUser);
        result.unshift(valueTopPushFirst);
        this.setState({ rankPLayer: res });
      })
      .catch(err => {
        this.setState({ rankPLayer: null });
        console.log(err);
      });
  }

  _noData = () => {
    return <Text h4>Il n'y a pas de donnée </Text>;
  };

  render() {
    let { rankPLayer } = this.state;

    if (rankPLayer === undefined) {
      return <Loading />;
    } else if (rankPLayer === null) {
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
          {rankPLayer.map((element, index) => {
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

export default Ranking;