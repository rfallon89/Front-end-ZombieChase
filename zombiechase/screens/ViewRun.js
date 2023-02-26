import { RunFinish } from "../component/runFinish";
import { View, Text, ImageBackground } from "react-native";
import Background from "../assets/Background.png";
export default function ViewRun({ route }) {
  const { runData, created_at } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Text>{created_at.slice(0, 10)}</Text>
        <RunFinish
          counter={runData.counter}
          distance={runData.distance}
          speed={runData.speed}
          caught={runData.caught}
          position={runData.position}
          zombiePositionArray={runData.zombiePositionArray}
        />
      </ImageBackground>
    </View>
  );
}
