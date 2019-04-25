import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";

import {
  BACKGROUND_HEADER,
  TEXT_HEADER,
  BUTTON_COLOR_TWO
} from "../../utils/colors";

// Libs Extenal
import { Text } from "react-native-elements";

//  Internal Component
import { Header } from "react-native-elements";
import { Loading } from "../components/Loading";
import { getHistory } from "../../api/game";
import Container from "../components/Container";
import { CardHistory } from "../components/CardHistory";

class Historic extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    historicPLayer: undefined
  };

  // GET - HISTORY PARTY OF THE USER
  async componentDidMount() {
    const infoUserStr = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserStr);

    getHistory(infoUser.uuid, infoUser.token)
      .then(res => {
        let result;
        if (res.hasOwnProperty("msg")) {
          result = null;
        } else {
          result = res;
        }
        this.setState({ historicPLayer: result });
      })
      .catch(err => {
        this.setState({ historicPLayer: null });
        console.log(err);
      });

    // MAJ WHEN PLAYER CHANGE TAB
    this._subscribe = this.props.navigation.addListener(
      "didFocus",
      async () => {
        getHistory(infoUser.uuid, infoUser.token)
          .then(res => {
            let result;
            if (res.hasOwnProperty("msg")) {
              result = null;
            } else {
              result = res;
            }
            this.setState({ historicPLayer: result });
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  }

  // VIEW - No data
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
