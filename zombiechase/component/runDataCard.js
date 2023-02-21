import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";

export const runData = ({ counter, distance, speed, stop, position }) => {
  return (
    <View>
      <Text>Time: {timerFormat(counter)}</Text>
      <Text>{`Distance: ${distance} km`}</Text>
      {stop ? (
        <View>
          <Text>Avg Pace: {parseFloat(avgSpeed(speed).toFixed(2))}km/hr</Text>
          <Map position={position} />
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
