import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";
import { View, Text, StyleSheet } from "react-native";
import { postRun } from "../utils/api";
import { userContext } from "../component/UserContext";
import { useContext, useEffect } from "react";

export const RunFinish = ({
  counter,
  distance,
  speed,
  caught,
  position,
  zombiePositionArray,
}) => {
  const { user, token } = useContext(userContext);
  const run_data = {
    distance: distance,
    time: timerFormat(counter),
    pace: parseFloat(avgSpeed(speed).toFixed(2)),
    caught: caught,
    zombiePosition: zombiePositionArray,
  };
  useEffect(() => {
    postRun(user._id, token, run_data);
  }, []);

  return (
    <View>
      {zombiePositionArray ? (
        <Map
          position={position}
          zombiePositionArray={zombiePositionArray}
          caught={caught}
        />
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
