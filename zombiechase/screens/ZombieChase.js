import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RunData } from "../component/runDataCard";
import zombieAudio from "../utils/zombieAudio";
import startAudio from "../utils/startRace";
import { timerFormat } from "../utils/timerFormat";

export default function ZombieChase() {
  //----------------------Zombie States-------------------------
  const [zombiePace, setZombiePace] = useState(0);
  const [chaseDistance, setChaseDistance] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [zombieDistance, setZombieDistance] = useState(0);
  const [caught, setCaught] = useState({});
  //------------------------Run Data----------------------------
  const [position, setPosition] = useState([]);
  const [speed, setSpeed] = useState([]);
  const [distance, setDistance] = useState(0);
  //------------------------Timer Data--------------------------
  const [counter, setCounter] = useState(0);
  //------------------------SetInterval States------------------
  const [tracker, setTracker] = useState(null);
  const [timer, setTimer] = useState(null);
  const [zombie, setZombie] = useState(null);
  //--------------------------Button States---------------------
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [pause, setPause] = useState(false);
  //------------------Chase Set Up------------------------------
  useEffect(
    () =>
      zombiePace != 0 && chaseDistance != 0
        ? setShowStart(true)
        : setShowStart(false),
    [zombiePace, chaseDistance]
  );
  //--------------------Location Permission---------------------
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
  //--------------------------Check Chase Status---------------
  useEffect(() => {
    if (zombieDistance >= distance && distance != 0 && !caught.distance) {
      console.log("CAUGHT!!!!!!");
      zombieAudio();
      setCaught({ distance: distance, time: counter });
      clearInterval(zombie);
    }
  }, [distance]);
  //---------------------------Track Run-----------------------
  useEffect(() => {
    const startRun = async () => {
      tracker ? tracker.remove() : null;
      let tracking = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 5,
        },
        ({ coords }) => {
          let latLong = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };

          setPosition((cur) => {
            setDistance(
              geolib.getPathLength([...cur, latLong], geolib.getPreciseDistance)
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
  //--------------------------Start Run------------------------
  const commence = () => {
    setStart(true);
    setPause(false);
    startAudio();
    setTimeout(() => {
      let count = setInterval(() => {
        setCounter((curr) => curr + 1);
      }, 1000);
      setTimer(count);
      let zombieRun = setInterval(() => {
        setZombieDistance((curr) =>
          parseFloat((curr + zombiePace / 3.6).toFixed(3))
        );
      }, 1000);
      setZombie(zombieRun);
    }, 3200);
  };
  //------------------------------------------------------------
  const PauseRun = () => {
    setPause(true);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
    clearInterval(timer);
    clearInterval(zombie);
  };
  //------------------------------------------------------------
  const stopRun = () => {
    setStart(false);
    setStop(true);
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
    clearInterval(timer);
    clearInterval(zombie);
    console.log(position);
  };
  //------------------------------------------------------------
  return (
    <View>
      {!start && !stop ? (
        //----------------------Set Up Render-------------------------
        <View>
          <Text>Set Zombie Pace:</Text>
          <TextInput
            onChangeText={setZombiePace}
            value={zombiePace}
            keyboardType="numeric"
          />
          <Text>km/hr</Text>
          <Text>Chase Distance:</Text>
          <TextInput
            onChangeText={setChaseDistance}
            value={chaseDistance}
            keyboardType="numeric"
          />
          <Text>km</Text>
          {showStart ? (
            <Button onPress={commence} title="Start" color="green" />
          ) : null}
        </View>
      ) : pause && !stop ? (
        //-----------------------Pause Render---------------------------
        <View>
          <RunData
            counter={counter}
            distance={distance}
            speed={speed}
            stop={stop}
            position={position}
          />
          <Button onPress={commence} title="Start" color="green" />
          <Button onPress={stopRun} title="Stop" color="red" />
        </View>
      ) : !stop && start ? (
        //-------------------------Restart After Pause Render-----------
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
        //--------------------------Stop Render---------------------------
        <View>
          {caught.distance ? (
            <Text>
              {`Your brains were eaten ${timerFormat(caught.time)} in at${
                caught.distance / 1000
              }km`}
            </Text>
          ) : (
            <Text>
              {`You live to run another day. The zombie was ${parseFloat(
                ((distance - zombieDistance) / 1000).toFixed(3)
              )}km behind you!`}
            </Text>
          )}
          <RunData
            counter={counter}
            distance={distance}
            speed={speed}
            stop={stop}
            position={position}
            caught={caught}
          />
        </View>
      )}
    </View>
  );
}
