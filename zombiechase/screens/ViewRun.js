import { RunFinish } from "../component/runFinish";
import { View, Text, ImageBackground } from "react-native";
import Background from "../assets/Background.png";
export default function ViewRun({ route }) {
  const {
    run_data: { time, runData, caught, zombieRoute },
    created_at,
  } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Text>{created_at.slice(0, 10)}</Text>
        <RunFinish
          counter={time}
          caught={caught}
          zombieRoute={zombieRoute}
          runData={runData}
        />
      </ImageBackground>
    </View>
  );
}
