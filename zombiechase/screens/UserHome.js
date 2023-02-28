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
import { getUser } from "../utils/api";
import Background from "../assets/Background.png";
import zombieGrave from "../assets/zombieGrave.png";
import runIcon from "../assets/runIcon.png";
import histroy from "../assets/history.png";

export default function UserHome({ route, navigation }) {
  const { responseToken } = route.params;
  const { setUser, setToken, setIsLoggedIn } = useContext(userContext);

  useEffect(() => {
    getUser(responseToken)
      .then((data) => {
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUser({});
        setToken("");
        setIsLoggedIn(false);
        navigation.navigate("Login");
      });
  }, []);

  const signOut = () => {
    setUser({});
    setToken("");
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };

  const Go = () => {
    navigation.push("Run");
  };
  const ZombieChase = () => {
    navigation.push("ChaseSetup");
  };
  const RunHistory = () => {
    navigation.push("RunHistory");
  };
  const Profile = () => {
    navigation.push("Profile")
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1, paddingTop: 50 }}
      >
        <Text>UserName</Text>
        <TouchableOpacity onPress={Profile}>
          <Text>Profile</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={signOut}>
          <Text> Sign out</Text>
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
    marginLeft: 55,
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
