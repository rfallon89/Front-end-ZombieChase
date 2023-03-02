import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { RunData } from "../component/RunDataCard";
import { RunFinish } from "../component/RunFinish";
import zombieAudio from "../utils/zombieAudio";
import startAudio from "../utils/startRace";
import { timerFormat } from "../utils/timerFormat";
import { zombiePositionArray } from "../utils/zombiePosition";
import { ProgressBar } from "react-native-paper";
import Background from "../assets/Background.png";
import runner from "../assets/runner-larger.png";
import zombieRunner from "../assets/zombie-larger.png";
import finishFlag from "../assets/finishFlag.png";
import startLine from "../assets/startLine.png";

export default function ZombieChase({ route }) {
  const { zombiePace, chaseDistance, zombieStart } = route.params;

  //----------------------Progress Bar--------------------------
  const [zombieProgress, setZombieProgress] = useState(30);
  const [runnerProgress, setRunnerProgress] = useState(30);
  //----------------------Zombie States-------------------------
  const [zombieDistance, setZombieDistance] = useState(zombieStart);
  const [caught, setCaught] = useState({});
  //------------------------Run Data----------------------------
  const [runData, setRunData] = useState({
    position: [],
    distance: 0,
    speed: [],
  });
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
  //--------------------------Check Chase Status---------------
  useEffect(() => {
    if (counter === 0) {
      startAudio();
      setRunData((cur) => {
        return { ...cur, position: [] };
      });
    }
    if (counter != 0) {
      setRunnerProgress(30 + 200 * (runData.distance / (chaseDistance * 1000)));

      if (!caught.distance) {
        if (zombieDistance > 0) {
          setZombieProgress(
            30 + 200 * (zombieDistance / (chaseDistance * 1000))
          );
        }
      }
      if (
        zombieDistance >= runData.distance &&
        runData.distance != 0 &&
        !caught.distance
      ) {
        zombieAudio();
        setCaught({ distance: runData.distance, time: counter });
        clearInterval(zombie);
      }
      if (runData.distance >= chaseDistance * 1000 && runData.distance != 0) {
        stopRun();
      }
    }
  }, [counter]);
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
  //--------------------------Start Run------------------------
  const startRun = () => {
    startAudio(1);
    setTimeout(() => {
      setStart(true);
      setPause(false);
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
    setStart(false);
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
    setPause(false);
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
        style={{ flex: 1, paddingTop: 60 }}
      >
        {!stop ? (
          <View>
            <RunData counter={counter} runData={runData} />
            <Image
              source={finishFlag}
              style={{
                position: "absolute",
                top: 220,
                left: 250,
                zIndex: 1,
                width: 60,
                height: 60,
              }}
            />
            <Image
              source={zombieRunner}
              style={{
                position: "absolute",
                top: 217,
                left: zombieProgress,
                zIndex: 1,
                width: 62,
                height: 62,
              }}
            />
            <ProgressBar
              progress={1}
              color="green"
              style={{
                width: "60%",
                position: "absolute",
                right: "19%",
                top: 80,
              }}
            />
            <Image
              source={runner}
              style={{
                position: "absolute",
                top: 220,
                left: runnerProgress,
                width: 64,
                height: 64,
              }}
            />
            {!start && !pause ? (
              <TouchableOpacity onPress={startRun} style={styles.btnPosition}>
                <Text style={styles.startbtn}>Start</Text>
              </TouchableOpacity>
            ) : pause && !start ? (
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <TouchableOpacity
                  onPress={startRun}
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
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
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
            )}
          </View>
        ) : (
          //--------------------------Stop Render---------------------------
          <View>
            {runData.distance / 1000 < chaseDistance ? (
              <Text style={styles.zombieStatus}>
                {`You stopped ${
                  chaseDistance - runData.distance / 1000
                }km before your goal. The zombie is going to get you!!!!`}
              </Text>
            ) : caught.distance ? (
              <Text style={styles.zombieStatus}>
                {`Your brains were eaten ${timerFormat(caught.time)} in at ${
                  caught.distance / 1000
                } km`}
              </Text>
            ) : (
              <Text style={styles.zombieStatus}>
                {`You live to run another day. The zombie was ${parseFloat(
                  ((runData.distance - zombieDistance) / 1000).toFixed(3)
                )}km behind you!`}
              </Text>
            )}
            <RunFinish
              counter={counter}
              runData={runData}
              caught={caught}
              zombieRoute={zombiePositionArray(
                runData.position,
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
    marginTop: 170,
    width: 70,
    height: 70,
  },
  btnPositionPause: {
    marginTop: 170,
    width: 70,
    height: 70,
  },
  zombieStatus: {
    color: "white",
    marginHorizontal: "10%",
    textAlign: "center",
    marginBottom: 0,
    marginTop: 10,
    fontSize: 16,
  },
});
