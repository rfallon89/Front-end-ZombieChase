import { View, Text, TouchableOpacity } from "react-native";

export default function UserHome({ navigation }) {
  const Go = () => {
    navigation.push("Run");
  };
  const ZombieRun = () => {
    navigation.push("ZombieRun");
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
      <TouchableOpacity onPress={ZombieRun}>
        <Text>Zombie Run </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={RunHistory}>
        <Text> Previous Runs</Text>
      </TouchableOpacity>
    </View>
  );
}
