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
import { getHistory } from "../../api/game";
import Container from "../components/Container";
import { CardHistory } from "../components/CardHistory";

const HistoricPLayer = [
  {
    categoryLibelle: "SPORT",
    itemLibelle: "ballon",
    score: 100
  },
  {
    categoryLibelle: "SPORT",
    itemLibelle: "Chaussure",
    score: 10
  },
  {
    categoryLibelle: "Quotidien",
    itemLibelle: "Tee-shirt",
    score: 0
  },
  {
    categoryLibelle: "Technologie",
    itemLibelle: "ecran",
    score: 20
  }
];

class Historic extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    historicPLayer: undefined
  };

  async componentDidMount() {
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    getHistory(infoUser.uuid, infoUser.token)
      .then(res => {
        let result;
        if (Object.entries(res).length === 0) {
          // replace mock by null for delete test
          result = HistoricPLayer;
        } else {
          result = res;
        }
        this.setState({ historicPLayer: result });
      })
      .catch(err => {
        this.setState({ historicPLayer: null });
        console.log(err);
      });
  }

  _noData = () => {
    return <Text h4>Aucune partie joué </Text>;
  };

  render() {
    let { historicPLayer } = this.state;

    if (historicPLayer === undefined) {
      return <Loading />;
    } else if (historicPLayer === null) {
      return <Container>{this._noData()}</Container>;
    }

    return (
      <View style={{ paddingBottom: "10%" }}>
        <Header
          backgroundColor="#042867"
          centerComponent={{
            text: `Historique Partie`,
            style: { color: "#fff", fontWeight: "bold" }
          }}
        />
        <ScrollView style={{ height: "100%" }}>
          {historicPLayer.map((element, index) => {
            return <CardHistory key={index} props={element} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Historic;
