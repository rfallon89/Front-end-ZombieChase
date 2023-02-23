import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import runner from "../assets/runner.png";
import zombie from "../assets/zombie.png";
import start from "../assets/start.png";
import { useEffect, useState } from "react";

export const Map = ({ position, zombiePositionArray }) => {
  const [runtype, setRunType] = useState("");
  useEffect(() => {
    zombiePositionArray ? setRunType("Chase") : setRunType("Normal");
  }, []);

  return (
    <MapView
      style={styles[`map${runtype}`]}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: position[0].latitude,
        longitude: position[0].longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
    >
      <Marker
        title="Finish"
        icon={runner}
        coordinate={position[position.length - 1]}
      />
      <Marker title="Start" icon={start} coordinate={position[0]} />
      <Polyline
        coordinates={position}
        strokeColor="#A020F0"
        strokeColors={[
          "#7F0000",
          "#00000000",
          "#B24112",
          "#E5845C",
          "#238C23",
          "#7F0000",
        ]}
        strokeWidth={2}
      />
      {zombiePositionArray ? (
        <Polyline
          coordinates={zombiePositionArray}
          strokeColor="#00FF00"
          strokeColors={[
            "#7F0000",
            "#00000000",
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={2}
        />
      ) : null}
      {zombiePositionArray ? (
        <Marker
          title="Zombie"
          icon={zombie}
          coordinate={zombiePositionArray[zombiePositionArray.length - 1]}
        />
      ) : null}
    </MapView>
  );
};
let mapStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: "32",
      },
      {
        lightness: "-3",
      },
      {
        visibility: "on",
      },
      {
        weight: "1.18",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        saturation: "-70",
      },
      {
        lightness: "14",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: "100",
      },
      {
        lightness: "-14",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        lightness: "12",
      },
    ],
  },
];
const styles = StyleSheet.create({
  mapChase: {
    width: "90%",
    height: "65%",
    marginHorizontal: 15,
    marginVertical: 15,
  },
  mapNormal: {
    width: "90%",
    height: "75%",
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
