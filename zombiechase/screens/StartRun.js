import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";

export default function StartRun() {
  //--------------------------------------------------------------------------------------
  const [position, setPosition] = useState([]);
  const [speed, setSpeed] = useState([0]);
  const [distance, setDistance] = useState(0);
  const [counter, setCounter] = useState(0);
  //--------------------------------------------------------------------------------------
  const [timerPause, setTimerPause] = useState(true);
  const [tracker, setTracker] = useState(null);
  const [timer, setTimer] = useState(null);
  //--------------------------------------------------------------------------------------
  const [currentPos, setCurrentPos] = useState({});
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(true);
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
  //--------------------------------------------------------------------------------------
  useEffect(() => {
    let count = setInterval(() => {
      !tracker ? clearInterval(count) : null;
      setCounter((curr) => curr + 1);
      console.log(timerPause);
    }, 1000);
  }, [tracker]);
  //----------------------------------------------------------------------------------
  const startRun = async () => {
    setStart(true);
    setStop(false);
    setPause(false);
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
            geolib.getPathLength([...cur, latLong], geolib.getPreciseDistance) /
              1000
          );
          return [...cur, latLong];
        });
        setSpeed((cur) => [...cur, coords.speed]);
      }
    );
    setTracker(tracking);
  };
  //--------------------------------------------------------------------------------------
  const PauseRun = () => {
    setPause(!pause);
    setTimerPause(true);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
  };
  //--------------------------------------------------------------------------------------
  const stopRun = () => {
    setStart(false);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
    setPosition([]);
    setTimerPause(true);
  };
  //--------------------------------------------------------------------------------------
  return (
    <View>
      {!start ? (
        <View>
          <Text>{counter}</Text>
          <Text>{distance}km</Text>
          <Text>
            {parseFloat(((speed[speed.length - 1] * 3600) / 1000).toFixed(2))}
            km/hr
          </Text>
          <Button onPress={startRun} title="Start" color="green" />
        </View>
      ) : (
        // : pause ? (
        //   <View>
        //     <Button onPress={startRun} title="Start" color="green" />
        //     <Button onPress={stopRun} title="Stop" color="red" />
        //   </View>)
        <View>
          {/* <Button onPress={PauseRun} title="Pause" color="green" /> */}
          <Text>{counter}</Text>
          <Text>{distance}km</Text>
          <Text>
            {parseFloat(((speed[speed.length - 1] * 3600) / 1000).toFixed(2))}
            km/hr
          </Text>
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      )}
    </View>
  );
}
