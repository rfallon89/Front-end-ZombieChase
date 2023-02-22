import axios from "axios";
import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { userContext } from "../component/UserContext";

export default function UserHome({ route, navigation }) {
  const { responseToken } = route.params;
  const { user, setUser, token, setToken } = useContext(userContext);

  useEffect(() => {
    axios
      .get(`http://192.168.0.5:5000/user?secret_token=${responseToken}`)
      .then(({ data }) => {
        // console.log(data);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const Go = () => {
    navigation.push("Run");
  };
  const ZombieSetup = () => {
    navigation.push("ZombieSetup");
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
      <TouchableOpacity onPress={ZombieSetup}>
        <Text>Zombie Chase </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={RunHistory}>
        <Text> Previous Runs</Text>
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
