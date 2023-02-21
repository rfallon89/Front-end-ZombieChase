import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import finish from "../finish.png";

export const Map = ({ currentPos, position }) => {
  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={{
        latitude: currentPos.coords.latitude,
        longitude: currentPos.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
    >
      <Marker
        title="Finish"
        icon={finish}
        coordinate={position[position.length - 1]}
      />
      <Marker title="Start" pinColor="#117f00" coordinate={position[0]} />
      <Polyline
        coordinates={position}
        strokeColor="#000"
        strokeColors={[
          "#7F0000",
          "#00000000",
          "#B24112",
          "#E5845C",
          "#238C23",
          "#7F0000",
        ]}
        strokeWidth={4}
      />
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
  map: {
    width: "100%",
    height: "70%",
  },
});
