import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RunData } from "../component/runDataCard";
import zombieAudio from "../utils/zombieAudio";
import startAudio from "../utils/startRace";
import { timerFormat } from "../utils/timerFormat";
import { zombiePositionArray } from "../utils/zombiePosition";
import { List, TextInput } from "react-native-paper";
import zombieHead from "../assets/zombieHead.png";
import Background from "../assets/Background.png";
import distanceIcon from "../assets/distanceIcon.png";
import paceIcon from "../assets/paceIcon.png";

export default function ZombieChase() {
  //----------------------Dropdown------------------------------
  const [pick, setPick] = useState("Difficulty Mode:");
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
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
    startAudio();
  }, []);
  //--------------------------Check Chase Status---------------
  useEffect(() => {
    if (zombieDistance >= distance && distance != 0 && !caught.distance) {
      console.log("CAUGHT!!!!!!");
      zombieAudio();
      setCaught({ distance: distance, time: counter });
      clearInterval(zombie);
    }
    if (distance >= chaseDistance * 1000 && distance != 0) {
      stopRun();
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
    startAudio(1);
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
  };
  //------------------------------------------------------------
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {!start && !stop ? (
          //----------------------Set Up Render-------------------------
          <View style={styles.container}>
            <TextInput
              onChangeText={setZombiePace}
              value={zombiePace}
              keyboardType="numeric"
              mode="outlined"
              label={"Zombie Pace (km/hr)"}
              style={{ opacity: 1 }}
              right={<TextInput.Icon icon={paceIcon} />}
            />
            <TextInput
              onChangeText={setChaseDistance}
              value={chaseDistance}
              keyboardType="numeric"
              mode="outlined"
              label={"Chase Distance (km)"}
              right={<TextInput.Icon icon={distanceIcon} />}
            />
            <List.Section title="" style={styles.drop}>
              <List.Accordion
                title={`${pick}`}
                left={(props) => <List.Icon {...props} icon={zombieHead} />}
                expanded={expanded}
                onPress={handlePress}
                theme={{ colors: { background: `#E6E6FA` } }}
              >
                <List.Item
                  title="Easy"
                  onPress={() => {
                    setPick("Easy");
                    setZombieDistance(-50);
                    handlePress();
                  }}
                  style={styles.drop}
                />
                <List.Item
                  title="Medium"
                  onPress={() => {
                    setPick("Medium");
                    setZombieDistance(-30);
                    handlePress();
                  }}
                />
                <List.Item
                  title="Hard"
                  onPress={() => {
                    setPick("Hard");
                    setZombieDistance(-10);
                    handlePress();
                  }}
                />
              </List.Accordion>
            </List.Section>
            {showStart ? (
              <TouchableOpacity onPress={commence} style={styles.btnPosition}>
                <Text style={styles.startbtn}>Start</Text>
              </TouchableOpacity>
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
              zombiePositionArray={zombiePositionArray(
                position,
                zombieDistance
              )}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
  },
  container: {
    marginTop: "20%",
    marginHorizontal: 20,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 20,
    shadowColor: `#4b0082`,
    shadowOpacity: 1,
  },
  drop: {
    backgroundColor: `#E6E6FA`,
    opacity: 1,
  },
  startbtn: {
    borderRadius: 300,
    backgroundColor: "green",
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: 70,
    height: 70,
  },
  btnPosition: {
    marginLeft: "34%",
    marginTop: 15,
  },
});
