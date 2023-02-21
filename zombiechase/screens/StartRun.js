import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { Map } from "./Map";
import avgSpeed from "../utils/avgSpeed";
import { timerFormat } from "../utils/timerFormat";

export default function StartRun() {
  //--------------------------------------------------------------------------------------
  const [position, setPosition] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [distance, setDistance] = useState(0);
  const [counter, setCounter] = useState(0);
  //--------------------------------------------------------------------------------------
  const [tracker, setTracker] = useState(null);
  const [timer, setTimer] = useState(null);
  //--------------------------------------------------------------------------------------
  const [currentPos, setCurrentPos] = useState({});
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  //--------------------------------------------------------------------------------------
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

  useEffect(() => {
    const startRun = async () => {
      tracker ? tracker.remove() : null;
      let tracking = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
        },
        ({ coords }) => {
          let latLong = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };

          setPosition((cur) => {
            setDistance(
              geolib.getPathLength(
                [...cur, latLong],
                geolib.getPreciseDistance
              ) / 1000
            );
            return [...cur, latLong];
          });
          setSpeed((cur) => [...cur, coords.speed]);
        }
      );
      setTracker(tracking);
    };
    start ? startRun() : null;
  }, [start]);
  //--------------------------------------------------------------------------------------
  const commence = () => {
    setStart(true);
    let count = setInterval(() => {
      setCounter((curr) => curr + 1);
    }, 1000);
    setTimer(count);
  };
  //--------------------------------------------------------------------------------------
  const PauseRun = () => {
    setStart(false);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
    clearInterval(timer);
  };
  //--------------------------------------------------------------------------------------
  const stopRun = () => {
    setStart(false);
    setStop(true);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
    clearInterval(timer);
  };
  //--------------------------------------------------------------------------------------
  return (
    <View>
      {!start && !stop ? (
        <View>
          <Text>Time: {timerFormat(counter)}</Text>
          <Text>{`Distance: ${distance} km`}</Text>
          {speed.length > 0 ? (
            <Text>
              {`Current Speed:
            ${parseFloat(
              ((speed[speed.length - 1] * 3600) / 1000).toFixed(2)
            )} km/hr`}
            </Text>
          ) : (
            <Text>Current Speed: 0 km/hr</Text>
          )}
          <Button onPress={commence} title="Start" color="green" />
        </View>
      ) : !stop && start ? (
        <View>
          <Text>Time: {timerFormat(counter)}</Text>
          <Text>{`Distance: ${distance} km`}</Text>
          {speed.length > 0 ? (
            <Text>
              {`Current Speed:
            ${parseFloat(
              ((speed[speed.length - 1] * 3600) / 1000).toFixed(2)
            )} km/hr`}
            </Text>
          ) : (
            <Text>Current Speed: 0 km/hr</Text>
          )}
          <Button onPress={PauseRun} title="Pause" color="green" />
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      ) : (
        <View>
          <Text>Time: {timerFormat(counter)}</Text>
          <Text>Distance: {distance}km</Text>
          <Text>Avg Speed: {parseFloat(avgSpeed(speed).toFixed(2))}km/hr</Text>
          <Map position={position} currentPos={currentPos} />
        </View>
      )}
    </View>
  );
}
