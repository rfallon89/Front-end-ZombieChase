import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";

export default function StartRun() {
  const [position, setPosition] = useState([]);
  const [timer, setTimer] = useState(0);

  const [currentPos, setCurrentPos] = useState({});
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    const permissionRequest = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("location tracking denied");
        return;
      }
      let currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setCurrentPos(currentPosition);
    };
    permissionRequest();
  }, []);

  let tracking = null;

  const startRun = async () => {
    setStart(!start);
    setPause(false);
    tracking?.remove();
    tracking = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10,
      },
      (location) => {
        console.log(location, "watch function");
        setPosition((cur) => [
          ...cur,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        ]);
      }
    );
    const count = setInterval(() => {
      setTimer((curr) => curr + 1);
    }, 1000);
  };

  const PauseRun = () => {
    setPause(!pause);
    clearInterval(count);
    tracking?.remove();
  };

  const stopRun = () => {
    tracking?.remove();
    setPosition([]);
  };

  return (
    <View>
      {!start ? (
        <Button onPress={startRun} title="Start" color="green" />
      ) : pause ? (
        <View>
          <Button onPress={startRun} title="Start" color="green" />
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      ) : (
        <View>
          <Button onPress={PauseRun} title="Pause" color="green" />
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      )}
    </View>
  );
}
