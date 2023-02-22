import { View, Text, TouchableOpacity } from "react-native";

export default function UserHome({ navigation }) {
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
      <Text>UserName</Text>
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
    </View>
  );
}
