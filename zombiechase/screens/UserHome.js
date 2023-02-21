import { View, Text, TouchableOpacity } from "react-native";

export default function UserHome({ navigation }) {
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
      <Text>UserName</Text>
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
