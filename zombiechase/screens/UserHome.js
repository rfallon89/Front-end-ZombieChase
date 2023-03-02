import { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { userContext } from "../component/UserContext";
import Background from "../assets/Background.png";
import zombieGrave from "../assets/zombieGrave.png";
import runIcon from "../assets/runIcon.png";
import histroy from "../assets/history.png";
import { Button } from "react-native-paper";

export default function UserHome({ navigation }) {
  const { setUser, setToken, setIsLoggedIn, user } = useContext(userContext);

  const signOut = () => {
    setUser({});
    setToken("");
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };
  const Go = () => {
    navigation.push("Run", { user: user });
  };
  const ZombieChase = () => {
    navigation.push("ChaseSetup", { user: user });
  };
  const RunHistory = () => {
    navigation.push("RunHistory", { user: user });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <TouchableOpacity onPress={signOut} style={styles.signOut}>
          <Button icon="location-exit">Sign Out</Button>
        </TouchableOpacity>
        <View style={styles.cardsContainer}>
          <TouchableOpacity onPress={Go} style={styles.card}>
            <Image source={runIcon} />
            <Text style={styles.textRun}>Start Run </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ZombieChase} style={styles.card}>
            <Image source={zombieGrave} />
            <Text style={styles.textZombie}>Zombie Chase </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={RunHistory} style={styles.card}>
            <Image source={histroy} />
            <Text style={styles.textHistory}> Run History</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#a599ad",
    width: "80%",
    margin: 7,
    elevation: 20,
    shadowColor: "white",
    padding: 12,
    borderRadius: 10,
  },
  signOut: {
    position: "absolute",
    bottom: "5%",
    right: 0,
    zIndex: 1,
  },
  textRun: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 24,
    marginTop: 10,
  },
  textZombie: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 11,
    marginTop: 17,
  },
  textHistory: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 15,
    marginTop: 15,
  },
});
