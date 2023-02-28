import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { List, TextInput } from "react-native-paper";
import zombieHead from "../assets/zombieHead.png";
import Background from "../assets/Background.png";
import distanceIcon from "../assets/distanceIcon.png";
import paceIcon from "../assets/paceIcon.png";
import * as Location from "expo-location";

export default function ChaseSetup({ navigation }) {
  //----------------------Dropdown------------------------------
  const [pick, setPick] = useState("Difficulty Mode:");
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const [showStart, setShowStart] = useState(false);

  const [zombiePace, setZombiePace] = useState(0);
  const [chaseDistance, setChaseDistance] = useState(0);
  const [zombieStart, setZombieStart] = useState(-50);
  //------------------Chase Set Up------------------------------
  useEffect(() => {
    if (zombiePace != 0 && chaseDistance != 0) {
      setShowStart(true);
      return;
    }
  }, [zombiePace, chaseDistance]);

  //--------------------Location Permission---------------------
  useEffect(() => {
    const permissionRequest = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("location tracking denied");
        return;
      }
      const startLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
    };
    permissionRequest();
  }, []);

  //---------------------Go to Chase-----------------------------
  const commence = () => {
    navigation.push("ZombieChase", {
      zombiePace: zombiePace,
      chaseDistance: chaseDistance,
      zombieStart: zombieStart,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1, paddingTop: 50 }}
      >
        <View style={styles.container}>
          <TextInput
            onChangeText={setZombiePace}
            value={zombiePace}
            keyboardType="numeric"
            mode="outlined"
            label={"Zombie Pace (km/hr)"}
            right={<TextInput.Icon icon={paceIcon} />}
          />
          <TextInput
            onChangeText={setChaseDistance}
            value={chaseDistance}
            keyboardType="numeric"
            mode="outlined"
            label={"Chase Distance (km)"}
            right={<TextInput.Icon icon={distanceIcon} />}
          />
          <List.Section title="" style={styles.drop}>
            <List.Accordion
              title={`${pick}`}
              left={(props) => <List.Icon {...props} icon={zombieHead} />}
              expanded={expanded}
              onPress={handlePress}
              theme={{ colors: { background: `#E6E6FA` } }}
            >
              <List.Item
                title="Easy (100m)"
                onPress={() => {
                  setPick("Easy");
                  handlePress();
                  setZombieStart(-100);
                }}
                style={styles.drop}
              />
              <List.Item
                title="Medium (50m)"
                onPress={() => {
                  setPick("Medium");
                  handlePress();
                  setZombieStart(-50);
                }}
              />
              <List.Item
                title="Hard (25m)"
                onPress={() => {
                  setPick("Hard");
                  handlePress();
                  setZombieStart(-25);
                }}
              />
            </List.Accordion>
          </List.Section>
          {showStart ? (
            <TouchableOpacity onPress={commence} style={styles.btnPosition}>
              <Text style={styles.createbtn}>Create</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    marginHorizontal: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 15,
    borderRadius: 10,
    elevation: 20,
    shadowColor: `white`,
  },
  drop: {
    backgroundColor: `#E6E6FA`,
    opacity: 1,
  },
  createbtn: {
    borderRadius: 20,
    backgroundColor: "green",
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 1,
    width: 90,
    height: 30,
  },
  btnPosition: {
    marginLeft: "30%",
    marginTop: 30,
    width: 70,
    height: 70,
  },
});
