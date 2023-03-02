import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";
import { View, Text, StyleSheet } from "react-native";

export const RunView = ({
  counter,
  caught,
  runData: { distance, speed, position },
  zombieRoute,
}) => {
  return (
    <View>
      {zombieRoute ? (
        <Map position={position} zombieRoute={zombieRoute} caught={caught} />
      ) : (
        <Map position={position} />
      )}
      <View
        style={{
          borderStyle: "solid",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          width: 200,
          marginHorizontal: "18%",
          opacity: 0.7,
          elevation: 20,
          shadowColor: "white",
        }}
      >
        <Text>{`Time: ${timerFormat(counter)}`}</Text>
        <Text>{`Distance: ${distance / 1000} km`}</Text>
        <Text>{`Avg Pace: ${parseFloat(
          avgSpeed(speed).toFixed(2)
        )} km/hr`}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
