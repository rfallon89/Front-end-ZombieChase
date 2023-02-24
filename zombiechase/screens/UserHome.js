import axios from "axios";
import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { userContext } from "../component/UserContext";
import { getUser } from "../utils/api";

export default function UserHome({ route, navigation }) {
  const { responseToken } = route.params;
  const { setUser, setToken, setIsLoggedIn } = useContext(userContext);

  useEffect(() => {
    getUser(responseToken)
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUser({});
        setToken("");
        setIsLoggedIn(false);
        navigation.navigate("Login");
        console.log(err);
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
    navigation.push("ZombieChase");
  };
  const RunHistory = () => {
    navigation.push("RunHistory");
  };

  return (
    <View>
      <Text style={styles.red}>UserName</Text>
      {/* <Image>User Avatar</Image> */}
      <TouchableOpacity onPress={Go}>
        <Text>Start Run </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ZombieChase}>
        <Text>Zombie Chase </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={RunHistory}>
        <Text> Previous Runs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Text> Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});
