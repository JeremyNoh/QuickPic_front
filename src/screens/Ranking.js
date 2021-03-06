import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";

// Libs Extenal
import { Text } from "react-native-elements";

// Internal Component
import { BACKGROUND_BODY } from "../../utils/colors";

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

  // GET - Classement on User && place himself on the Top of array
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

    // For MAJ RANKING WHEN CHANGE TAB
    this._subscribe = this.props.navigation.addListener(
      "didFocus",
      async () => {
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
            console.log(err);
          });
      }
    );
  }

  // VIEW - no data
  _noData = () => <Text h4>le Classement est null </Text>;

  render() {
    let { rankPLayer } = this.state;

    if (rankPLayer === undefined) {
      return <Loading />;
    } else if (rankPLayer === null) {
      return <Container>{this._noData()}</Container>;
    }

    return (
      <View style={[{ paddingBottom: "10%" }, styles.bg]}>
        <Header
          backgroundColor={BACKGROUND_BODY}
          centerComponent={{
            text: `Classement Mondial`,
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
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

const styles = StyleSheet.create({
  bg: {
    backgroundColor: BACKGROUND_BODY
  }
});

export default Ranking;
