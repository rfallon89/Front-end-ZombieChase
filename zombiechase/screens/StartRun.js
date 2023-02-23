import { View, Button } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RunData } from "../component/runDataCard";
import startAudio from "../utils/startRace";

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
    startAudio();
    setTimeout(() => {
      let count = setInterval(() => {
        setCounter((curr) => curr + 1);
      }, 1000);
      setTimer(count);
    }, 3000);
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
          <RunData
            counter={counter}
            distance={distance}
            speed={speed}
            stop={stop}
            position={position}
          />
          <Button onPress={commence} title="Start" color="green" />
        </View>
      ) : !stop && start ? (
        <View>
          <RunData
            counter={counter}
            distance={distance}
            speed={speed}
            stop={stop}
            position={position}
          />
          <Button onPress={PauseRun} title="Pause" color="green" />
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      ) : (
        <View>
          <RunData
            counter={counter}
            distance={distance}
            speed={speed}
            stop={stop}
            position={position}
          />
        </View>
      )}
    </View>
  );
}
