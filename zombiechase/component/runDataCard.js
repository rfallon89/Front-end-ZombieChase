import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";
import { Map } from "./Map";
import { View, Text, StyleSheet } from "react-native";

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
      <View style={{ marginHorizontal: "25%", marginVertical: 20 }}>
        <Text style={{ color: "white" }}>Time:</Text>
        <Text style={{ color: "white", fontSize: 40 }}>
          {timerFormat(counter)}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.container}>
          <Text style={{ fontSize: 12 }}>Distance:</Text>
          <Text style={{ fontSize: 16 }}>{`${distance / 1000} km`}</Text>
        </View>
        {speed.length > 0 && !stop ? (
          <View style={styles.container}>
            <Text style={{ fontSize: 12 }}>Pace:</Text>
            <Text style={{ fontSize: 16 }}>
              {`${parseFloat(
                ((speed[speed.length - 1] * 3600) / 1000).toFixed(2)
              )} km/hr`}
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={{ fontSize: 12 }}>Pace: </Text>
            <Text style={{ fontSize: 16 }}> 0 km/hr</Text>
          </View>
        )}
      </View>
      {stop ? (
        <View>
          <Text>Avg Pace: {parseFloat(avgSpeed(speed).toFixed(2))}km/hr</Text>
          {!caught ? <Map position={position} /> : null}
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 20,
    shadowColor: `#4b0082`,
    shadowOpacity: 1,
    alignContent: "center",
    flexDirection: "column",
    display: "flex",
    width: 120,
  },
  statsContainer: {
    flexDirection: "row",
  },
});
