import React from "react";
import {
  View,
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

import { Text } from "react-native-elements";

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

  async componentDidMount() {
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    getRanking(infoUser.uuid, infoUser.token)
      .then(res => {
        let result;
        if (Object.entries(res).length === 0) {
          result = null;
        } else {
          result = res.filter(obj => !obj.isCurrentUser);
          let [valueTopPushFirst] = res.filter(obj => obj.isCurrentUser);
          result.unshift(valueTopPushFirst);
        }
        this.setState({ rankPLayer: result });
      })
      .catch(err => {
        this.setState({ rankPLayer: null });
        console.log(err);
      });
  }

  _noData = () => <Text h4>le Classement est null </Text>;

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
            style: { color: "#fff", fontWeight: "bold" }
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
