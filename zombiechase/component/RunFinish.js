import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";
import { View, Text, StyleSheet } from "react-native";
import { postRun } from "../utils/api";
import { userContext } from "./UserContext";
import { useContext, useEffect } from "react";

export const RunFinish = ({
  counter,
  caught,
  runData: { distance, speed, position },
  zombieRoute,
}) => {
  const {
    user: { _id },
    token,
  } = useContext(userContext);
  const run_data = {
    runData: { distance, speed, position },
    time: counter,
    caught: caught,
    zombieRoute: zombieRoute,
  };
  useEffect(() => {
    postRun(_id, token, run_data);
  }, []);

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
