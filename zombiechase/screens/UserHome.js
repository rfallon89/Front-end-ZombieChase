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
  const Profile = () => {
    navigation.push("Profile")
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
<<<<<<< HEAD
        <Text>UserName</Text>
        <TouchableOpacity onPress={Profile}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Go} style={styles.card}>
=======
        <TouchableOpacity onPress={signOut}>
          <Button icon="location-exit" style={styles.signOut}>
            Sign Out
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={Go} style={styles.cardTop}>
>>>>>>> ef503db757feb7370c88168f84a069385b744bcd
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#a599ad",
    width: 200,
    margin: 7,
    elevation: 20,
    shadowColor: "white",
    padding: 12,
    borderRadius: 10,
    marginLeft: 58,
  },
  signOut: {
    position: "absolute",
    top: 500,
    right: 0,
    zIndex: 1,
  },
  cardTop: {
    flexDirection: "row",
    backgroundColor: "#a599ad",
    width: 200,
    marginTop: 120,
    elevation: 20,
    shadowColor: "white",
    padding: 12,
    borderRadius: 10,
    marginLeft: 58,
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
