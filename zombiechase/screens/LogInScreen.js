import { Text, View, TouchableOpacity } from "react-native";

export default function LogInScreen({ navigation }) {
  return (
    <View>
      <View>
        <Text title="Zombie">Zombie Chase</Text>
      </View>
      <View>
        <TouchableOpacity
          title="Login"
          onPress={() => navigation.navigate("UserHome")}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
