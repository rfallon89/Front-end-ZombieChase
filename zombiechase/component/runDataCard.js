import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";
import { View, Text } from "react-native";

export const RunData = ({
  counter,
  distance,
  speed,
  stop,
  position,
  caught,
  zombiePositionArray,
}) => {
  return (
    <View>
      {caught ? (
        <Map position={position} zombiePositionArray={zombiePositionArray} />
      ) : null}
      <Text>Time: {timerFormat(counter)}</Text>
      <Text>{`Distance: ${distance / 1000} km`}</Text>
      {stop ? (
        <View>
          <Text>Avg Pace: {parseFloat(avgSpeed(speed).toFixed(2))}km/hr</Text>
          {!caught ? <Map position={position} /> : null}
        </View>
      ) : speed.length > 0 ? (
        <Text>
          {`Current Speed:
          ${parseFloat(
            ((speed[speed.length - 1] * 3600) / 1000).toFixed(2)
          )} km/hr`}
        </Text>
      ) : (
        <Text>Current Speed: 0 km/hr</Text>
      )}
    </View>
  );
};
