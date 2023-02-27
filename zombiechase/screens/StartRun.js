import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RunData } from "../component/runDataCard";
import startAudio from "../utils/startRace";
import Background from "../assets/Background.png";
import { RunFinish } from "../component/runFinish";

export default function StartRun() {
  //--------------------------------------------------------------------------------------
  const [runData, setRunData] = useState({
    position: [],
    distance: 0,
    speed: [],
  });
  const [counter, setCounter] = useState(0);
  //--------------------------------------------------------------------------------------
  const [tracker, setTracker] = useState(null);
  const [timer, setTimer] = useState(null);
  //--------------------------------------------------------------------------------------
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [pause, setPause] = useState(false);
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
    startAudio();
    setRunData((cur) => {
      return { ...cur, position: [] };
    });
  }, []);

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
          setRunData((cur) => {
            return {
              position: [...cur.position, latLong],
              distance: geolib.getPathLength(
                [...cur.position, latLong],
                geolib.getPreciseDistance
              ),
              speed: [...cur.speed, coords.speed],
            };
          });
        }
      );
      setTracker(tracking);
    };
    start ? startRun() : null;
  }, [start]);
  //--------------------------------------------------------------------------------------
  const commence = () => {
    startAudio(1);
    setStart(true);
    setPause(false);
    setTimeout(() => {
      let count = setInterval(() => {
        setCounter((curr) => curr + 1);
      }, 1000);
      setTimer(count);
    }, 3000);
  };
  //--------------------------------------------------------------------------------------
  const PauseRun = () => {
    setPause(true);
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {!start && !pause && !stop ? (
          <View>
            <RunData counter={counter} runData={runData} />
            <TouchableOpacity onPress={commence} style={styles.btnPosition}>
              <Text style={styles.startbtn}>Start</Text>
            </TouchableOpacity>
          </View>
        ) : pause && !stop ? (
          <View>
            <RunData counter={counter} runData={runData} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={commence}
                style={styles.btnPositionPause}
              >
                <Text style={styles.startbtn}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={stopRun}
                style={styles.btnPositionPause}
              >
                <Text style={styles.stopbtn}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : !stop && start ? (
          <View>
            <RunData counter={counter} runData={runData} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                onPress={PauseRun}
                style={styles.btnPositionPause}
              >
                <Text style={styles.pausebtn}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={stopRun}
                style={styles.btnPositionPause}
              >
                <Text style={styles.stopbtn}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <RunFinish counter={counter} runData={runData} />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
  pausebtn: {
    borderRadius: 300,
    backgroundColor: "green",
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 21,
    width: 70,
    height: 70,
  },
  stopbtn: {
    borderRadius: 300,
    backgroundColor: "red",
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    paddingHorizontal: 17,
    paddingVertical: 20,
    width: 70,
    height: 70,
  },
  btnPosition: {
    marginLeft: "39%",
    marginTop: 55,
    width: 70,
    height: 70,
  },
  btnPositionPause: {
    marginTop: 100,
    width: 70,
    height: 70,
  },
});
